export const STEP_DATA = {
  "tensors-autograd": Array.from({ length: 8 }, (_, i) => ({
    id: `t${i + 1}`,
    title: `Step ${i + 1}`,
    description:
      i === 0
        ? "Create a tensor from a Python list and print its shape and dtype."
        : `Placeholder description for step ${i + 1}. Replace with real lesson content.`,
    starterCode: `import torch\n\n# TODO: your code here\n`,
    solutionCode: `import torch\n\nx = torch.tensor([1, 2, 3])\nprint(x.shape, x.dtype)\n`,
  })),
  "first-neural-net": Array.from({ length: 10 }, (_, i) => ({
    id: `n${i + 1}`,
    title: `Step ${i + 1}`,
    description: `Placeholder description for step ${i + 1}. Replace with real lesson content.`,
    starterCode: `import torch.nn as nn\n\n# TODO: your code here\n`,
    solutionCode: `import torch.nn as nn\n\nclass Net(nn.Module):\n    pass\n`,
  })),
    // Real content pulled from the Streamlit AlgoGuru "image_classification"
  // tutorial (Step-01 through Step-12): titles, descriptions, starter code,
  // and solution code, formatted to match the STEP_DATA structure.
  //
  // Paste this as a new key inside your existing STEP_DATA object
  // (alongside "tensors-autograd", "first-neural-net", "cnn-capstone").

  "image-classification": [
    {
      id: "step1",
      title: "Import Required Libraries",
      description: "Learn how to import the essential libraries used throughout the image classification project.",
      starterCode: "# TODO: Import PyTorch\n\n# TODO: Import torchvision transforms\n\n# TODO: Import matplotlib.pyplot as plt",
      solutionCode: "import torch\nfrom torchvision import transforms\nimport matplotlib.pyplot as plt",
    },
    {
      id: "step2",
      title: "Load a Built-in Dataset",
      description: "Learn how to load a built-in image dataset using torchvision.datasets.",
      starterCode: "from torchvision.datasets import MNIST\n\n# Create the dataset\n\n# dataset = (can choose from MNIST, FashionMNIST, CIFAR10, KMNIST)",
      solutionCode: "from torchvision import datasets\nfrom torchvision import transforms\n\ntransform = transforms.ToTensor()\n\n# Choose ONE dataset by uncommenting it.\n\n# dataset = datasets.CIFAR10(\n#     root=\"data\",\n#     train=True,\n#     download=True,\n#     transform=transform,\n# )\n\ndataset = datasets.MNIST(\n    root=\"data\",\n    train=True,\n    download=True,\n    transform=transform,\n)\n\n# dataset = datasets.FashionMNIST(\n#     root=\"data\",\n#     train=True,\n#     download=True,\n#     transform=transform,\n# )\n\n# dataset = datasets.KMNIST(\n#     root=\"data\",\n#     train=True,\n#     download=True,\n#     transform=transform,\n# )\n\n# dataset = datasets.EMNIST(\n#     root=\"data\",\n#     split=\"letters\",\n#     train=True,\n#     download=True,\n#     transform=transform,\n# )\n\nprint(f\"Loaded {dataset.__class__.__name__}\")\nprint(f\"Number of images: {len(dataset)}\")",
    },
    {
      id: "step3",
      title: "Explore the Dataset",
      description: "Learn how to inspect an ImageFolder dataset and understand its structure.",
      starterCode: "from torchvision import datasets\nfrom torchvision import transforms\n\ntransform = transforms.ToTensor()\n\ndataset = datasets.ImageFolder(\n    \"assets/dataset\",\n    transform=transform,\n)\n\n# Print the class names\n\n# Print the total number of images",
      solutionCode: "from torchvision import datasets\nfrom torchvision import transforms\n\ntransform = transforms.ToTensor()\n\ndataset = datasets.ImageFolder(\n    \"assets/dataset\",\n    transform=transform,\n)\n\nprint(dataset.classes)\nprint(len(dataset))",
    },
    {
      id: "step4",
      title: "Build a Preprocessing Pipeline",
      description: "Create an image preprocessing pipeline using torchvision transforms.",
      starterCode: "from torchvision import transforms\n\n# Create a preprocessing pipeline.\n\n# Store it in a variable called transform.",
      solutionCode: "from torchvision import transforms\n\ntransform = transforms.Compose([\n    transforms.Resize((224, 224)),\n    transforms.ToTensor(),\n    transforms.Normalize(\n        mean=[0.485, 0.456, 0.406],\n        std=[0.229, 0.224, 0.225],\n    ),\n])",
    },
    {
      id: "step5",
      title: "Create DataLoaders",
      description: "Learn how to create DataLoaders for batching and shuffling image data.",
      starterCode: "from torchvision import datasets\nfrom torchvision import transforms\nfrom torch.utils.data import DataLoader\n\ntransform = transforms.Compose([\n    transforms.Resize((224, 224)),\n    transforms.ToTensor(),\n])\n\ndataset = datasets.ImageFolder(\n    \"assets/dataset\",\n    transform=transform,\n)\n\n# Create train_loader here",
      solutionCode: "from torchvision import datasets\nfrom torchvision import transforms\nfrom torch.utils.data import DataLoader\n\ntransform = transforms.Compose([\n    transforms.Resize((224, 224)),\n    transforms.ToTensor(),\n])\n\ndataset = datasets.ImageFolder(\n    \"assets/dataset\",\n    transform=transform,\n)\n\ntrain_loader = DataLoader(\n    dataset,\n    batch_size=32,\n    shuffle=True,\n)",
    },
    {
      id: "step6",
      title: "Build a CNN",
      description: "Build a simple Convolutional Neural Network for image classification.",
      starterCode: "import torch\nimport torch.nn as nn\n\n\nclass SimpleCNN(nn.Module):\n\n    def __init__(self):\n        super().__init__()\n\n        # Define layers here\n\n\n    def forward(self, x):\n\n        # Forward pass\n\n        return x",
      solutionCode: "import torch\nimport torch.nn as nn\n\n\nclass SimpleCNN(nn.Module):\n\n    def __init__(self):\n        super().__init__()\n\n        self.conv1 = nn.Conv2d(\n            in_channels=3,\n            out_channels=16,\n            kernel_size=3,\n            padding=1,\n        )\n\n        self.pool = nn.MaxPool2d(\n            kernel_size=2,\n            stride=2,\n        )\n\n        self.fc1 = nn.Linear(\n            16 * 112 * 112,\n            2,\n        )\n\n    def forward(self, x):\n\n        x = self.conv1(x)\n        x = torch.relu(x)\n        x = self.pool(x)\n\n        x = torch.flatten(x, 1)\n\n        x = self.fc1(x)\n\n        return x",
    },
    {
      id: "step7",
      title: "Configure Loss and Optimizer",
      description: "Configure the loss function and optimizer required to train the model.",
      starterCode: "import torch\nimport torch.nn as nn\nimport torch.optim as optim\n\n\nclass SimpleCNN(nn.Module):\n\n    def __init__(self):\n        super().__init__()\n\n        self.conv1 = nn.Conv2d(3, 16, 3, padding=1)\n        self.pool = nn.MaxPool2d(2, 2)\n        self.fc1 = nn.Linear(16 * 112 * 112, 2)\n\n    def forward(self, x):\n        x = self.pool(torch.relu(self.conv1(x)))\n        x = torch.flatten(x, 1)\n        x = self.fc1(x)\n        return x\n\n\n# Create the model\n\n# Define the loss function\n\n# Create the optimizer",
      solutionCode: "import torch\nimport torch.nn as nn\nimport torch.optim as optim\n\n\nclass SimpleCNN(nn.Module):\n\n    def __init__(self):\n        super().__init__()\n\n        self.conv1 = nn.Conv2d(3, 16, 3, padding=1)\n        self.pool = nn.MaxPool2d(2, 2)\n        self.fc1 = nn.Linear(16 * 112 * 112, 2)\n\n    def forward(self, x):\n        x = self.pool(torch.relu(self.conv1(x)))\n        x = torch.flatten(x, 1)\n        x = self.fc1(x)\n        return x\n\n\nmodel = SimpleCNN()\n\ncriterion = nn.CrossEntropyLoss()\n\noptimizer = optim.Adam(\n    model.parameters(),\n    lr=0.001,\n)",
    },
    {
      id: "step8",
      title: "Write the Training Loop",
      description: "Complete the training loop by performing the forward pass, computing the loss, and updating the model weights.",
      starterCode: "for images, labels in train_loader:\n\n    optimizer.zero_grad()\n\n    # Forward pass\n\n    # Compute loss\n\n    # Backpropagation\n\n    # Update weights\n\nprint(\"Training completed.\")",
      solutionCode: "for images, labels in train_loader:\n\n    optimizer.zero_grad()\n\n    outputs = model(images)\n\n    loss = criterion(outputs, labels)\n\n    loss.backward()\n\n    optimizer.step()\n\nprint(\"Training completed.\")",
    },
    {
      id: "step9",
      title: "Evaluate the Model",
      description: "Evaluate the trained model by calculating its classification accuracy.",
      starterCode: "correct = 0\ntotal = 0\n\n# Switch model to evaluation mode\n\n# Disable gradients\n\n# Iterate through test_loader\n\n# Compute predictions\n\n# Update correct and total\n\n# Calculate accuracy\n\nprint(\"Accuracy:\", accuracy)",
      solutionCode: "correct = 0\ntotal = 0\n\nmodel.eval()\n\nwith torch.no_grad():\n\n    for images, labels in test_loader:\n\n        outputs = model(images)\n\n        _, predicted = torch.max(outputs, 1)\n\n        total += labels.size(0)\n\n        correct += (predicted == labels).sum().item()\n\naccuracy = (correct / total) * 100\n\nprint(f\"Accuracy: {accuracy:.2f}%\")",
    },
    {
      id: "step10",
      title: "Classify a Single Image",
      description: "Use the trained model to classify a single image.",
      starterCode: "# Preprocess the image\n\n# Switch model to evaluation mode\n\n# Predict the class\n\n# Print the predicted label",
      solutionCode: "model.eval()\n\nimage = transform(image)\n\nimage = image.unsqueeze(0)\n\nwith torch.no_grad():\n\n    outputs = model(image)\n\n    _, predicted = torch.max(outputs, 1)\n\nprint(\n    \"Predicted Class:\",\n    class_names[predicted.item()]\n)",
    },
    {
      id: "step11",
      title: "Save and Load the Model",
      description: "Learn how to save a trained model and load it back for inference.",
      starterCode: "# Save the model\n\n# Create a new model\n\n# Load the weights\n\n# Switch to evaluation mode\n\nprint(\"Model ready for inference.\")",
      solutionCode: "torch.save(\n    model.state_dict(),\n    \"model.pth\",\n)\n\nloaded_model = SimpleCNN()\n\nloaded_model.load_state_dict(\n    torch.load(\"model.pth\")\n)\n\nloaded_model.eval()\n\nprint(\"Model ready for inference.\")",
    },
    {
      id: "step12",
      title: "Build the Final Application",
      description: "Build a complete image classification application using everything learned throughout the course.",
      starterCode: "\"\"\"\nCapstone Project\n\nComplete every TODO.\n\"\"\"\n\n# TODO 1\n# Import libraries\n\n# TODO 2\n# Create transforms\n\n# TODO 3\n# Load dataset\n\n# TODO 4\n# Create DataLoader\n\n# TODO 5\n# Build CNN\n\n# TODO 6\n# Configure loss and optimizer\n\n# TODO 7\n# Train for 2 epochs\n\n# TODO 8\n# Evaluate accuracy\n\n# TODO 9\n# Save model\n\n# TODO 10\n# Predict one image",
      solutionCode: "import torch\nimport torch.nn as nn\nimport torch.optim as optim\n\nfrom PIL import Image\n\nfrom torchvision import datasets\nfrom torchvision import transforms\n\nfrom torch.utils.data import DataLoader\n\n\n# ==========================\n# Image Transform\n# ==========================\n\ntransform = transforms.Compose([\n    transforms.Resize((224, 224)),\n    transforms.ToTensor(),\n    transforms.Normalize(\n        mean=[0.485, 0.456, 0.406],\n        std=[0.229, 0.224, 0.225],\n    ),\n])\n\n\n# ==========================\n# Dataset\n# ==========================\n\ndataset = datasets.ImageFolder(\n    \"assets/dataset\",\n    transform=transform,\n)\n\ntrain_loader = DataLoader(\n    dataset,\n    batch_size=32,\n    shuffle=True,\n)\n\nclass_names = dataset.classes\n\n\n# ==========================\n# CNN Model\n# ==========================\n\nclass SimpleCNN(nn.Module):\n\n    def __init__(self):\n        super().__init__()\n\n        self.conv1 = nn.Conv2d(\n            in_channels=3,\n            out_channels=16,\n            kernel_size=3,\n            padding=1,\n        )\n\n        self.pool = nn.MaxPool2d(\n            kernel_size=2,\n            stride=2,\n        )\n\n        self.fc1 = nn.Linear(\n            16 * 112 * 112,\n            len(class_names),\n        )\n\n    def forward(self, x):\n\n        x = self.conv1(x)\n        x = torch.relu(x)\n\n        x = self.pool(x)\n\n        x = torch.flatten(x, 1)\n\n        x = self.fc1(x)\n\n        return x\n\n\n# ==========================\n# Training Setup\n# ==========================\n\nmodel = SimpleCNN()\n\ncriterion = nn.CrossEntropyLoss()\n\noptimizer = optim.Adam(\n    model.parameters(),\n    lr=0.001,\n)\n\n\n# ==========================\n# Training\n# ==========================\n\nepochs = 2\n\nfor epoch in range(epochs):\n\n    model.train()\n\n    running_loss = 0.0\n\n    for images, labels in train_loader:\n\n        optimizer.zero_grad()\n\n        outputs = model(images)\n\n        loss = criterion(\n            outputs,\n            labels,\n        )\n\n        loss.backward()\n\n        optimizer.step()\n\n        running_loss += loss.item()\n\n    print(\n        f\"Epoch {epoch + 1}/{epochs} \"\n        f\"Loss: {running_loss / len(train_loader):.4f}\"\n    )\n\n\n# ==========================\n# Evaluation\n# ==========================\n\nmodel.eval()\n\ncorrect = 0\ntotal = 0\n\nwith torch.no_grad():\n\n    for images, labels in train_loader:\n\n        outputs = model(images)\n\n        _, predicted = torch.max(\n            outputs,\n            1,\n        )\n\n        total += labels.size(0)\n\n        correct += (\n            predicted == labels\n        ).sum().item()\n\naccuracy = 100 * correct / total\n\nprint(f\"Accuracy: {accuracy:.2f}%\")\n\n\n# ==========================\n# Save Model\n# ==========================\n\ntorch.save(\n    model.state_dict(),\n    \"model.pth\",\n)\n\nprint(\"Model saved as model.pth\")\n\n\n# ==========================\n# Load Model\n# ==========================\n\nloaded_model = SimpleCNN()\n\nloaded_model.load_state_dict(\n    torch.load(\"model.pth\")\n)\n\nloaded_model.eval()\n\n\n# ==========================\n# Predict One Image\n# ==========================\n\nimage = Image.open(\n    \"assets/sample.jpg\"\n).convert(\"RGB\")\n\nimage = transform(image)\n\nimage = image.unsqueeze(0)\n\nwith torch.no_grad():\n\n    outputs = loaded_model(image)\n\n    _, predicted = torch.max(\n        outputs,\n        1,\n    )\n\nprint(\n    \"Predicted Class:\",\n    class_names[predicted.item()],\n)\n\nprint(\"\\nProject completed successfully!\")",
    }
  ],
};