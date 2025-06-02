# Mini_CRM_Platform


A modern, responsive Customer Relationship Management (CRM) platform built with React. This application allows you to manage customers, create targeted campaigns, and track performance metrics.

## Features

- **Dashboard**: Overview of key metrics and recent activity
- **Customer Management**: View and manage customer database
- **Campaign Creation**: Build targeted campaigns with custom audience rules
- **Campaign History**: Track campaign performance and success rates
- **Audience Segmentation**: Advanced rule builder for customer targeting

## Screenshots

The application includes:
- Clean, modern UI with Tailwind CSS
- Interactive dashboard with key metrics
- Advanced rule builder for campaign targeting
- Comprehensive campaign tracking and analytics

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Vridhi02Aggarwal/Mini_CRM_Platform.git
cd mini-crm-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```


## Project Structure

```
src/
├── components/
│   ├── CampaignForm.js       # Campaign creation form
│   ├── CampaignHistory.js    # Campaign tracking and history
│   ├── Dashboard.js          # Main dashboard component
│   └── RuleBuilder.js        # Audience rule builder
├── services/
│   └── apiService.js         # Mock API service
├── App.js                    # Main application component
├── App.css                   # Global styles
└── index.js                  # Application entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Create React App** - Development environment

## Features Overview

### Dashboard
- Total customers, active customers, and revenue metrics
- Recent customer and campaign activity
- Quick navigation to all platform features

### Customer Management
- Comprehensive customer database view
- Customer status tracking (active/inactive)
- Spending and visit history

### Campaign Builder
- Advanced rule-based audience targeting
- Real-time audience size estimation
- Support for multiple rule conditions (AND/OR logic)
- Custom message creation

### Campaign Analytics
- Success rate tracking
- Delivery statistics
- Historical performance data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help with setup, please open an issue on GitHub.
