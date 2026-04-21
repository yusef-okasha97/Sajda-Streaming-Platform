# 🕋 Quran Streaming Platform (GitOps on EKS)
<img width="1694" height="928" alt="image" src="https://github.com/user-attachments/assets/54c5f220-ab27-4753-a8cc-2988a0ed35d0" />



A production-ready DevOps project demonstrating a complete CI/CD and GitOps workflow for a Quran streaming application deployed on AWS EKS (Elastic Kubernetes Service).

---

## 🚀 Key Features & Tech Stack

* **Continuous Integration (CI):** Powered by **GitHub Actions** using a **Self-hosted Runner** for faster feedback loops.
    * **Static Code Analysis (SAST):** Integrated with **SonarQube** to ensure code quality and security standards.
    * **Vulnerability Scanning:** Automated container scanning with **Trivy**.
* **Continuous Delivery (GitOps):** Managed by **Argo CD** on the EKS cluster, automatically syncing changes in the `nginx` folder/manifests.
* **Containerization:** Custom **Nginx** Docker image.
* **Orchestration:** Kubernetes manages deployments and services.
* **Observability & Monitoring:** Fully monitored using **Prometheus** and **Grafana** for real-time cluster and pod metrics.

---

## 🛠 Project Architecture

1.  **Code Push:** Developer pushes code to GitHub.
2.  **CI Pipeline (Self-hosted):** * **SonarQube** scans the source code for bugs and vulnerabilities.
    * **Docker Build** creates the Nginx-based image.
    * **Trivy** performs a security scan on the image.
    * If all checks pass, the image is pushed to the Docker Registry.
3.  **GitOps Sync:** **Argo CD** detects changes in the `/nginx` manifests and synchronizes the cluster state.
4.  **Monitoring & Alerting:** * **Prometheus** scrapes metrics.
    * **Grafana** visualizes data.
    * **Slack** receives instant notifications for any cluster anomalies.

---

## 📁 Repository Structure
```text
├── .github/workflows/    # CI Pipeline (Build, Scan, Push)
├── nginx/                # Kubernetes Manifests (Deployment & Service) tracked by ArgoCD
└── README.md             # This file


## 🚦 How to Use

### 1. Prerequisites
Before deploying, ensure you have the following ready:
* A running Kubernetes Cluster.
* **ArgoCD** installed and running on the cluster.
* **Prometheus** and **Grafana** configured for cluster monitoring.
* `kubectl` and `helm` installed locally to manage resources if needed.
* **SonarQube** installed and running on the cluster.

### 2. CI/CD Setup
To enable the automated build and push pipeline:
1. Go to your GitHub repository **Settings** > **Secrets and variables** > **Actions**.
2. Add the following repository secrets:
    * `DOCKER_USERNAME`: Your Docker Hub or container registry username.
    * `DOCKER_PASSWORD`: Your Docker Hub password or access token.
    * `SONAR_TOKEN`: Your Sonar token.
    * `SONAR_HOST_URL`: Your host IP and port sonarqube.

### 3. GitOps Configuration
Connect your cluster's ArgoCD to this repository and point the Application path to the `nginx/` folder. ArgoCD will handle the creation of your Deployments and Services automatically.
