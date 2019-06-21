workflow "Deploy to GitHub Pages" {
  on = "push"
  resolves = ["hugo-deploy-gh-pages"]
}

action "hugo-deploy-gh-pages" {
  uses = "khanhicetea/gh-actions-hugo-deploy-gh-pages@master"
  secrets = [
    "TOKEN"
  ]
  env = {
    HUGO_VERSION = "0.54"
    TARGET_REPO = "raduq/blog"
  }
}
