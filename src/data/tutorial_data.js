import { Boxes, Network, Image } from "lucide-react";

export const TUTORIALS = [
  {
    id: "tensors-autograd",
    icon: Boxes,
    title: "Tensors & Autograd Basics",
    subtitle: "Foundations",
    desc: "Get hands-on with PyTorch tensors, gradients, and the autograd engine before touching a single neural net.",
    steps: 8,
    accent: "#D9822B",
  },
  {
    id: "first-neural-net",
    icon: Network,
    title: "Building Your First Neural Net",
    subtitle: "Core ML",
    desc: "Wire up layers, loss functions, and an optimizer to train a real network from scratch on a toy dataset.",
    steps: 10,
    accent: "#3B7DDE",
  },
  {
    id: "image-classification",
    icon: Image,
    title: "Image Classification with CNNs",
    subtitle: "Computer vision tutorial",
    desc: "Load a real image dataset, build a CNN from scratch, train it, and use it to classify new images.",
    steps: 12,
    accent: "#2BB9A3",
  },
];