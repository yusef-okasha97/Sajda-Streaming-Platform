# 🕋 Quran Streaming Platform (GitOps on EKS)

A production-ready DevOps project demonstrating a complete CI/CD and GitOps workflow for a Quran streaming application deployed on AWS EKS (Elastic Kubernetes Service).

---

## 🚀 Key Features & Tech Stack

* **Continuous Integration (CI):** Automated with **GitHub Actions**.
    * Builds the Docker image.
    * Performs security vulnerability scanning using **Trivy**.
    * Pushes the clean image to Docker Registry.
* **Continuous Delivery (GitOps):** Managed by **Argo CD** on the EKS cluster, automatically syncing changes in the `nginx` folder/manifests.
* **Containerization:** Custom **Nginx** Docker image.
* **Orchestration:** **AWS EKS** (Kubernetes) managing deployments and services.
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
