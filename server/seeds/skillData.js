import { PositionNames } from "../entities/Position.js";

export const skillData = [
  {
    name: "React.js",
    description: {
      low: "Basic understanding of components and JSX",
      medium: "Can manage state and props effectively",
      average: "Able to use hooks and context API",
      high: "Expert in performance optimization and advanced patterns"
    },
    position: [PositionNames.FRONTEND]
  },
  {
    name: "Vue.js",
    description: {
      low: "Familiar with Vue instance and directives",
      medium: "Can build components and use Vue Router",
      average: "Understands Vuex and lifecycle hooks",
      high: "Expert in Vue 3 composition API and optimization"
    },
    position: [PositionNames.FRONTEND]
  },
  {
    name: "HTML5",
    description: {
      low: "Knows basic tags and structure",
      medium: "Understands semantic HTML and forms",
      average: "Can build accessible and SEO-friendly pages",
      high: "Expert in HTML5 APIs and responsive design"
    },
    position: [PositionNames.FRONTEND]
  },
  {
    name: "CSS3",
    description: {
      low: "Knows basic selectors and properties",
      medium: "Can use Flexbox and Grid",
      average: "Understands animations and transitions",
      high: "Expert in responsive design and preprocessors"
    },
    position: [PositionNames.FRONTEND]
  },
  {
    name: "JavaScript",
    description: {
      low: "Understands variables and functions",
      medium: "Can use ES6 features and DOM manipulation",
      average: "Familiar with async programming and closures",
      high: "Expert in design patterns and performance tuning"
    },
    position: [PositionNames.FRONTEND, PositionNames.BACKEND]
  },
  {
    name: "Node.js",
    description: {
      low: "Can run basic scripts",
      medium: "Understands modules and npm",
      average: "Can build REST APIs",
      high: "Expert in streams, clusters, and performance"
    },
    position: [PositionNames.BACKEND]
  },
  {
    name: "Express.js",
    description: {
      low: "Can set up a basic server",
      medium: "Understands routing and middleware",
      average: "Can handle authentication and error handling",
      high: "Expert in scalable architecture and security"
    },
    position: [PositionNames.BACKEND]
  },
  {
    name: "MongoDB",
    description: {
      low: "Knows basic CRUD operations",
      medium: "Understands schema design and indexing",
      average: "Can use aggregation and transactions",
      high: "Expert in performance tuning and replication"
    },
    position: [PositionNames.BACKEND]
  },
  {
    name: "PostgreSQL",
    description: {
      low: "Knows basic SQL queries",
      medium: "Understands joins and constraints",
      average: "Can write stored procedures and triggers",
      high: "Expert in optimization and partitioning"
    },
    position: [PositionNames.BACKEND]
  },
  {
    name: "Python",
    description: {
      low: "Understands syntax and basic data types",
      medium: "Can write functions and use libraries",
      average: "Familiar with OOP and file handling",
      high: "Expert in frameworks and performance tuning"
    },
    position: [PositionNames.BACKEND, PositionNames.TESTING]
  },
  {
    name: "Django",
    description: {
      low: "Can set up a project and run server",
      medium: "Understands models and views",
      average: "Can build REST APIs and use middleware",
      high: "Expert in scaling and security"
    },
    position: [PositionNames.BACKEND]
  },
  {
    name: "REST API",
    description: {
      low: "Understands HTTP methods",
      medium: "Can build basic endpoints",
      average: "Handles authentication and error codes",
      high: "Expert in versioning and documentation"
    },
    position: [PositionNames.FRONTEND, PositionNames.BACKEND]
  },
  {
    name: "Unit Testing",
    description: {
      low: "Knows basic test cases",
      medium: "Can write tests for functions",
      average: "Understands mocking and coverage",
      high: "Expert in test-driven development"
    },
    position: [PositionNames.TESTING]
  },
  {
    name: "Selenium",
    description: {
      low: "Can write simple test scripts",
      medium: "Understands locators and waits",
      average: "Can automate workflows",
      high: "Expert in frameworks and CI integration"
    },
    position: [PositionNames.TESTING]
  },
  {
    name: "Jest",
    description: {
      low: "Can write basic test cases",
      medium: "Understands matchers and mocks",
      average: "Can test React components",
      high: "Expert in snapshot and async testing"
    },
    position: [PositionNames.FRONTEND, PositionNames.TESTING]
  },
  {
    name: "Cypress",
    description: {
      low: "Can write simple end-to-end tests",
      medium: "Understands commands and assertions",
      average: "Can test complex user flows",
      high: "Expert in custom commands and CI"
    },
    position: [PositionNames.TESTING]
  },
  {
    name: "Recruitment",
    description: {
      low: "Understands job descriptions",
      medium: "Can screen resumes",
      average: "Conducts interviews",
      high: "Expert in talent acquisition strategy"
    },
    position: [PositionNames.HR]
  },
  {
    name: "Employee Engagement",
    description: {
      low: "Knows basic engagement activities",
      medium: "Can conduct surveys",
      average: "Analyzes feedback",
      high: "Expert in strategy and retention"
    },
    position: [PositionNames.HR]
  },
  {
    name: "Payroll Management",
    description: {
      low: "Understands salary structure",
      medium: "Can process payroll",
      average: "Handles compliance",
      high: "Expert in automation and audits"
    },
    position: [PositionNames.HR]
  },
  {
    name: "Conflict Resolution",
    description: {
      low: "Understands basic mediation",
      medium: "Can handle minor disputes",
      average: "Uses structured resolution methods",
      high: "Expert in policy and legal compliance"
    },
    position: [PositionNames.HR]
  }
];
