/**
 * Central API client for the AlgoGuru FastAPI backend.
 *
 * The frontend uses hyphenated tutorial ids ("image-classification") and
 * un-padded step ids ("step1"), while the backend uses underscored project
 * folder names ("image_classification") and zero-padded step folders
 * ("step01"). These helpers translate between the two so the rest of the
 * app never has to think about it.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// "image-classification" -> "image_classification"
export function toBackendProject(tutorialId) {
  return tutorialId.replaceAll("-", "_");
}

// "step1" -> "step01", "step12" -> "step12"
export function toBackendStep(stepId) {
  const match = stepId.match(/^step(\d+)$/i);
  if (!match) return stepId;
  const num = match[1].padStart(2, "0");
  return `step${num}`;
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      // response wasn't JSON, keep statusText
    }
    throw new Error(`API error (${res.status}): ${detail}`);
  }

  return res.json();
}

export function listProjects() {
  return request("/projects");
}

export function listSteps(tutorialId) {
  const project = toBackendProject(tutorialId);
  return request(`/projects/${project}/steps`);
}

export async function getStarterCode(tutorialId, stepId) {
  const project = toBackendProject(tutorialId);
  const step = toBackendStep(stepId);
  const data = await request(`/projects/${project}/steps/${step}/starter`);
  return data.code;
}

export async function getSolutionCode(tutorialId, stepId) {
  const project = toBackendProject(tutorialId);
  const step = toBackendStep(stepId);
  const data = await request(`/projects/${project}/steps/${step}/solution`);
  return data.code;
}

export function executeCode(tutorialId, stepId, code) {
  const project = toBackendProject(tutorialId);
  const step = toBackendStep(stepId);
  return request("/execute", {
    method: "POST",
    body: JSON.stringify({ project, step, code }),
  });
}

export function getProgress(tutorialId) {
  const project = toBackendProject(tutorialId);
  return request(`/progress/${project}`);
}