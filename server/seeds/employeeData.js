export const employeeData = [
  {
    id: "LMT101",
    name: "Rinku Chauhan",
    email: "rinku@lumel.com",
    password: null,
    role_id: 1,
    team_id: null,
    lead_id: null,
    hr_id: null,
    department_id: 1,
    position_id: 1,
    score: 0,
    skill_score: {
      "Employee Engagement": 3,
      "Payroll Management": 4,
      "Recruitment": 3,
      "Conflict Resolution": 4,
    },
  },
  {
    id: "LMT102",
    name: "Malini Narayanan",
    email: "malini@lumel.com",
    password: null,
    role_id: 1,
    team_id: null,
    lead_id: "LMT101",
    hr_id: "LMT101",
    department_id: 1,
    position_id: 1,
    score: 0,
    skill_score: {
      "Employee Engagement": 3,
      "Payroll Management": 1,
      "Recruitment": 2,
      "Conflict Resolution": 2,
    },
  },

  //director (lead for leads)
  {
    id: "LMT801",
    name: "Srikkanth Mohanasundaram",
    email: "srikkanth@lumel.com",
    password: null,
    role_id: 2,
    team_id: null,
    lead_id: null,
    hr_id: "LMT101",
    department_id: 2,
    position_id: 2,
    score: 0,
    skill_score: {
      "HTML5": 4,
      "React.js": 4,
      "JavaScript": 4,
      "CSS3": 5,
      "Vue.js": 5,
    },
  },

  {
    id: "LMT802",
    name: "Devaraj N Subramanian",
    email: "devaraj@lumel.com",
    password: null,
    role_id: 2,
    team_id: null,
    lead_id: null,
    hr_id: "LMT101",
    department_id: 2,
    position_id: 3,
    score: 0,
    skill_score: {
      "HTML5": 4,
      "React.js": 4,
      "JavaScript": 4,
      "CSS3": 5,
      "Vue.js": 5,
    },
  },


  // === INFORIVER ===
  {
    id: "LMT201",
    name: "Kesava Pradha",
    email: "kesava@lumel.com",
    password: null,
    role_id: 2,
    team_id: 1,
    lead_id: "LMT801",
    hr_id: "LMT102",
    department_id: 2,
    position_id: 2,
    score: 0,
    skill_score: {
      "HTML5": 4,
      "React.js": 2,
      "JavaScript": 4,
      "CSS3": 2,
      "Vue.js": 2,
    },
  },
  {
    id: "LMT301",
    name: "Nandhini Gunasekaran",
    email: "nandhini@lumel.com",
    password: null,
    role_id: 3,
    team_id: 1,
    lead_id: "LMT201",
    hr_id: "LMT102",
    department_id: 2,
    position_id: 2,
    score: 0,
    skill_score: {
      "Vue.js": 1,
      "CSS3": 1,
      "JavaScript": 21,
      "React.js": 1,
      "HTML5": 1
    }
    ,
  },
  {
    id: "LMT302",
    name: "Abishek Babu",
    email: "abishek@lumel.com",
    password: null,
    role_id: 3,
    team_id: 1,
    lead_id: "LMT201",
    hr_id: "LMT102",
    department_id: 2,
    position_id: 2,
    score: 0,
    skill_score: {
      "HTML5": 1,
      "Vue.js": 1,
      "React.js": 1,
      "JavaScript": 1,
      "CSS3": 1
    }

  },

  {
    id: "LMT202",
    name: "Srinivasan ",
    email: "srinivasan@lumel.com",
    role_id: 2,
    team_id: 1,
    lead_id: "LMT802",
    hr_id: "LMT102",
    department_id: 2,
    position_id: 3,
    score: 0,
    skill_score: {
      "Node.js": 2,
      "Express.js": 3,
      "Python": 2,
      "MongoDB": 3,
      "PostgreSQL": 3
    }

  },
  {
    id: "LMT303",
    name: "Vimalkanth Ravichandran",
    email: "vimal@lumel.com",
    role_id: 3,
    team_id: 1,
    lead_id: "LMT202",
    hr_id: "LMT102",
    department_id: 2,
    position_id: 3,
    score: 0,
    skill_score: {
      "MongoDB": 1,
      "Node.js": 1,
      "Python": 1,
      "PostgreSQL": 1,
      "Express.js": 1
    }
    ,
  },
  {
    id: "LMT304",
    name: "Sanjay Kumar",
    email: "sanjay@lumel.com",
    role_id: 3,
    team_id: 1,
    lead_id: "LMT202",
    hr_id: "LMT102",
    department_id: 2,
    position_id: 3,
    score: 0,
    skill_score: {
      "MongoDB": 1,
      "PostgreSQL": 1,
      "Express.js": 1,
      "Python": 1,
      "Node.js": 1
    }
    ,
  },

  // === VALQ ===
  {
    id: "LMT203",
    name: "Venkatraman Kannan",
    email: "venkat@lumel.com",
    role_id: 2,
    team_id: 2,
    lead_id: "LMT801",
    hr_id: "LMT101",
    department_id: 2,
    position_id: 2,
    score: 0,
    skill_score: {
      "JavaScript": 4,
      "Vue.js": 2,
      "React.js": 2,
      "HTML5": 2,
      "CSS3": 3
    }
    ,
  },
  {
    id: "LMT305",
    name: "Arulmurugan Raju",
    email: "arul@lumel.com",
    role_id: 3,
    team_id: 2,
    lead_id: "LMT203",
    hr_id: "LMT101",
    department_id: 2,
    position_id: 2,
    score: 0,
    skill_score: {
      "JavaScript": 1,
      "Vue.js": 1,
      "React.js": 1,
      "CSS3": 1
    }
    ,
  },
  {
    id: "LMT306",
    name: "Ajaikumar Nataraj",
    email: "ajay@lumel.com",
    role_id: 3,
    team_id: 2,
    lead_id: "LMT203",
    hr_id: "LMT101",
    department_id: 2,
    position_id: 2,
    score: 0,
    skill_score: {
      "HTML5": 1,
      "Vue.js": 1,
      "CSS3": 1,
      "JavaScript": 1
    }
    ,
  },

  {
    id: "LMT204",
    name: "Murugan Natarajan",
    email: "murugan@lumel.com",
    role_id: 2,
    team_id: 2,
    lead_id: "LMT802",
    hr_id: "LMT101",
    department_id: 2,
    position_id: 3,
    score: 0,
    skill_score: {
      "PostgreSQL": 2,
      "Express.js": 3,
      "Python": 3,
      "MongoDB": 2
    }

  },
  {
    id: "LMT307",
    name: "Sowmiya Kumaravel",
    email: "sowmiya@lumel.com",
    role_id: 3,
    team_id: 2,
    lead_id: "LMT204",
    hr_id: "LMT101",
    department_id: 2,
    position_id: 3,
    score: 0,
    skill_score: {
      "Node.js": 1,
      "Express.js": 1,
      "MongoDB": 1,
      "Python": 1
    }

  },
  {
    id: "LMT308",
    name: "Sudharshan Harikrishnan",
    email: "sudharshan@lumel.com",
    role_id: 3,
    team_id: 2,
    lead_id: "LMT204",
    hr_id: "LMT101",
    department_id: 2,
    position_id: 3,
    score: 0,
    skill_score: {
      "Python": 1,
      "PostgreSQL": 1,
      "MongoDB": 1,
      "Node.js": 1
    }
    ,
  },

  // Generic testing team_id (no team_id)
  {
    id: "LMT205",
    name: "Mohanapriya Sudhakaran",
    email: "mohanapriya@lumel.com",
    role_id: 2,
    team_id: null,
    lead_id: "LMT802",
    hr_id: "LMT101",
    department_id: 2,
    position_id: 4,
    score: 0,
    skill_score: {
      "Unit Testing": 3,
      "Selenium": 2,
      "Jest": 4,
      "Cypress": 1
    }

  },
  {
    id: "LMT309",
    name: "Suriya",
    email: "suriya@lumel.com",
    role_id: 3,
    team_id: null,
    lead_id: "LMT205",
    hr_id: "LMT101",
    department_id: 2,
    position_id: 4,
    score: 0,
    skill_score: {
      "Selenium": 1,
      "Jest": 1,
      "Unit Testing": 1
    }

  },
  {
    id: "LMT310",
    name: "Dhanush",
    email: "dhanush@lumel.com",
    role_id: 3,
    team_id: null,
    lead_id: "LMT205",
    hr_id: "LMT101",
    department_id: 2,
    position_id: 4,
    score: 0,
    skill_score: {
      "Cypress": 1,
      "Unit Testing": 1,
      "Selenium": 1,
      "Jest": 1
    }
    ,
  },
];
