This project is a React-based E-Commerce application demonstrating Test-Driven Development (TDD), Continuous Integration (CI), and Continuous Deployment (CD). Users can browse products, filter by category, and add items to a cart. The app is modular, maintainable, and fully tested to ensure reliability. I wrote two unit tests for separate components and an integration test to ensure the shopping cart updates correctly when a product is added.

The development follows TDD principles, with unit tests for components and integration tests verifying workflows like adding products to the cart. CI/CD is implemented using GitHub Actions and Vercel: every push to master runs tests and deploys the app automatically if all tests pass.

Key Highlights
Test-Driven Development (TDD):
- Unit tests for multiple components (rendering, state, interactions)
- Integration test ensures Cart updates correctly

Continuous Integration (CI):
- GitHub Actions builds project and runs tests on every push
- Fails workflow if tests fail to prevent bad deployments

Continuous Deployment (CD):
- Deploys automatically to Vercel after successful CI
- Live URL: ci-cd-pipeline-for-react-e-commerce-theta.vercel.app

Technologies:
- React, Redux Toolkit, Jest, React Testing Library
- GitHub Actions (CI/CD), Vercel
