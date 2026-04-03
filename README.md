# 🕋 Quran Streaming Platform (GitOps on EKS)
![3aa6d5a2-da5c-42f8-8619-077424720ed4](https://github.com/user-attachments/assets/ddc53fd0-2523-4674-a844-11ea740324b1)


A production-ready DevOps project demonstrating a complete CI/CD and GitOps workflow for a Quran streaming application deployed on AWS EKS (Elastic Kubernetes Service).

---

## 🚀 Key Features & Tech Stack

* **Continuous Integration (CI):** Automated with **GitHub Actions**.
    * Builds the Docker image.
    * Performs security vulnerability scanning using **Trivy**.
    * Pushes the clean image to Docker Registry.
* **Continuous Delivery (GitOps):** Managed by **Argo CD** on the EKS cluster, automatically syncing changes in the `nginx` folder/manifests.
* **Containerization:** Custom **Nginx** Docker image.
* **Orchestration:** Kubernetes managing deployments and services.
* **Observability & Monitoring:** Fully monitored using **Prometheus** and **Grafana** for real-time cluster and pod metrics.

---

## 🛠 Project Architecture

1.  **Code Push:** Developer pushes code to the GitHub repository.
2.  **CI Pipeline:** GitHub Actions triggers, builds the image, and **Trivy** scans it. If vulnerabilities are found, the pipeline fails. If clean, the image is pushed to the Docker Registry.
3.  **GitOps Sync:** Argo CD detects changes in the Kubernetes manifests (under the `nginx` directory) and automatically applies them to the cluster.
4.  **Monitoring:** Prometheus scrapes metrics from the pods, and Grafana visualizes the health and traffic of the application.

---

## 📁 Repository Structure
```text
├── .github/workflows/    # CI Pipeline (Build, Scan, Push)
├── nginx/                # Kubernetes Manifests (Deployment & Service) tracked by ArgoCD
└── README.md             # This file


## 🚦 How to Use

### 1. Prerequisites
Before deploying, ensure you have the following ready:
* A running Kubernetes Cluster (AWS EKS preferred).
* **ArgoCD** installed and running on the cluster.
* **Prometheus** and **Grafana** configured for cluster monitoring.
* `kubectl` and `helm` installed locally to manage resources if needed.

### 2. CI/CD Setup
To enable the automated build and push pipeline:
1. Go to your GitHub repository **Settings** > **Secrets and variables** > **Actions**.
2. Add the following repository secrets:
    * `DOCKER_USERNAME`: Your Docker Hub or container registry username.
    * `DOCKER_PASSWORD`: Your Docker Hub password or access token.

### 3. GitOps Configuration
Connect your cluster's ArgoCD to this repository and point the Application path to the `nginx/` folder. ArgoCD will handle the creation of your Deployments and Services automatically.
