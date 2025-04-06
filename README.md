# GitHub Activity Dashboard

A Next.js application that visualizes GitHub user activity including repositories and commit history.

## Features

- Search for any GitHub user
- View user's repositories
- Visualize commit activity over time

## Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- GitHub API

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- GitHub account (for API access)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vikasyadav01234/github-activity-dashboard.git
```

2. Install dependencies:
```bash
npm install
```


3. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a GitHub username in the search field
2. Click "Search" button
3. View the user's repositories and commit activity charts

## Project Structure

```
github-activity-dashboard/
├── app/                  # Next.js app directory
│   └── page.tsx          # Main page component
├── components/           # React components
│   ├── CommitsChart.tsx  # Commit visualization
│   ├── UserRepositories.tsx # Repositories list
│   └── ui/               # UI components
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT *(Note: Confirm license from package.json if needed)*
