import Question from '../models/Question.js';
import { initializeDatabase } from '../config/database.js';

/**
 * 60 quiz questions - 20 Easy, 20 Medium, 20 Hard
 */
const sampleQuestions = [
  // ==================== EASY QUESTIONS (20) ====================
  {
    questionText: 'What does HTML stand for?',
    options: {
      A: 'Hyper Text Markup Language',
      B: 'High Tech Modern Language',
      C: 'Home Tool Markup Language',
      D: 'Hyperlinks and Text Markup Language'
    },
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Web Development'
  },
  {
    questionText: 'Which symbol is used for comments in JavaScript?',
    options: {
      A: '/* */',
      B: '//',
      C: '<!-- -->',
      D: 'Both A and B'
    },
    correctOption: 'D',
    difficulty: 'easy',
    category: 'JavaScript'
  },
  {
    questionText: 'What does CSS stand for?',
    options: {
      A: 'Computer Style Sheets',
      B: 'Cascading Style Sheets',
      C: 'Creative Style Sheets',
      D: 'Colorful Style Sheets'
    },
    correctOption: 'B',
    difficulty: 'easy',
    category: 'Web Development'
  },
  {
    questionText: 'Which HTML tag is used for the largest heading?',
    options: {
      A: '<h6>',
      B: '<heading>',
      C: '<h1>',
      D: '<head>'
    },
    correctOption: 'C',
    difficulty: 'easy',
    category: 'HTML'
  },
  {
    questionText: 'What is the correct way to declare a variable in JavaScript?',
    options: {
      A: 'var x = 5;',
      B: 'variable x = 5;',
      C: 'v x = 5;',
      D: 'declare x = 5;'
    },
    correctOption: 'A',
    difficulty: 'easy',
    category: 'JavaScript'
  },
  {
    questionText: 'Which attribute is used to provide a unique identifier for an HTML element?',
    options: {
      A: 'class',
      B: 'id',
      C: 'name',
      D: 'key'
    },
    correctOption: 'B',
    difficulty: 'easy',
    category: 'HTML'
  },
  {
    questionText: 'What does SQL stand for?',
    options: {
      A: 'Structured Query Language',
      B: 'Simple Question Language',
      C: 'Strong Query Language',
      D: 'Standard Question Language'
    },
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Database'
  },
  {
    questionText: 'Which HTTP status code means "OK"?',
    options: {
      A: '404',
      B: '500',
      C: '200',
      D: '302'
    },
    correctOption: 'C',
    difficulty: 'easy',
    category: 'Web Development'
  },
  {
    questionText: 'What is the file extension for JavaScript files?',
    options: {
      A: '.java',
      B: '.js',
      C: '.javascript',
      D: '.jsx'
    },
    correctOption: 'B',
    difficulty: 'easy',
    category: 'JavaScript'
  },
  {
    questionText: 'Which tag is used to create a hyperlink in HTML?',
    options: {
      A: '<link>',
      B: '<a>',
      C: '<href>',
      D: '<url>'
    },
    correctOption: 'B',
    difficulty: 'easy',
    category: 'HTML'
  },
  {
    questionText: 'What does API stand for?',
    options: {
      A: 'Application Programming Interface',
      B: 'Advanced Programming Interface',
      C: 'Application Process Integration',
      D: 'Automated Programming Interface'
    },
    correctOption: 'A',
    difficulty: 'easy',
    category: 'General'
  },
  {
    questionText: 'Which company developed JavaScript?',
    options: {
      A: 'Microsoft',
      B: 'Netscape',
      C: 'Google',
      D: 'Apple'
    },
    correctOption: 'B',
    difficulty: 'easy',
    category: 'JavaScript'
  },
  {
    questionText: 'What is the correct syntax for referring to an external JavaScript file?',
    options: {
      A: '<script src="app.js">',
      B: '<script href="app.js">',
      C: '<script name="app.js">',
      D: '<js src="app.js">'
    },
    correctOption: 'A',
    difficulty: 'easy',
    category: 'JavaScript'
  },
  {
    questionText: 'Which tag is used to display an image in HTML?',
    options: {
      A: '<image>',
      B: '<img>',
      C: '<picture>',
      D: '<src>'
    },
    correctOption: 'B',
    difficulty: 'easy',
    category: 'HTML'
  },
  {
    questionText: 'What does JSON stand for?',
    options: {
      A: 'JavaScript Object Notation',
      B: 'Java Source Object Notation',
      C: 'JavaScript Oriented Notation',
      D: 'Java Serialized Object Notation'
    },
    correctOption: 'A',
    difficulty: 'easy',
    category: 'General'
  },
  {
    questionText: 'Which CSS property is used to change text color?',
    options: {
      A: 'text-color',
      B: 'font-color',
      C: 'color',
      D: 'text-style'
    },
    correctOption: 'C',
    difficulty: 'easy',
    category: 'CSS'
  },
  {
    questionText: 'What is the default port for HTTP?',
    options: {
      A: '443',
      B: '8080',
      C: '80',
      D: '3000'
    },
    correctOption: 'C',
    difficulty: 'easy',
    category: 'Networking'
  },
  {
    questionText: 'Which operator is used for equality comparison in JavaScript?',
    options: {
      A: '=',
      B: '==',
      C: '===',
      D: 'Both B and C'
    },
    correctOption: 'D',
    difficulty: 'easy',
    category: 'JavaScript'
  },
  {
    questionText: 'What does DOM stand for?',
    options: {
      A: 'Document Object Model',
      B: 'Data Object Model',
      C: 'Document Oriented Model',
      D: 'Digital Object Model'
    },
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Web Development'
  },
  {
    questionText: 'Which HTML tag is used to define an unordered list?',
    options: {
      A: '<ol>',
      B: '<ul>',
      C: '<list>',
      D: '<li>'
    },
    correctOption: 'B',
    difficulty: 'easy',
    category: 'HTML'
  },

  // ==================== MEDIUM QUESTIONS (20) ====================
  {
    questionText: 'Which of the following is NOT a JavaScript framework?',
    options: {
      A: 'React',
      B: 'Angular',
      C: 'Django',
      D: 'Vue.js'
    },
    correctOption: 'C',
    difficulty: 'medium',
    category: 'Web Development'
  },
  {
    questionText: 'What is the purpose of the "use strict" directive in JavaScript?',
    options: {
      A: 'To enable strict mode',
      B: 'To disable debugging',
      C: 'To optimize code',
      D: 'To enable ES6 features'
    },
    correctOption: 'A',
    difficulty: 'medium',
    category: 'JavaScript'
  },
  {
    questionText: 'Which HTTP method is used to update a resource?',
    options: {
      A: 'GET',
      B: 'POST',
      C: 'PUT',
      D: 'DELETE'
    },
    correctOption: 'C',
    difficulty: 'medium',
    category: 'Web Development'
  },
  {
    questionText: 'What does REST stand for in RESTful APIs?',
    options: {
      A: 'Representational State Transfer',
      B: 'Remote State Transfer',
      C: 'Reliable State Transfer',
      D: 'Rapid State Transfer'
    },
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Backend Development'
  },
  {
    questionText: 'Which database is NOT a NoSQL database?',
    options: {
      A: 'MongoDB',
      B: 'PostgreSQL',
      C: 'Redis',
      D: 'CouchDB'
    },
    correctOption: 'B',
    difficulty: 'medium',
    category: 'Database'
  },
  {
    questionText: 'What is the purpose of Node.js?',
    options: {
      A: 'To run JavaScript on the server',
      B: 'To style web pages',
      C: 'To create databases',
      D: 'To compile C++ code'
    },
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Backend Development'
  },
  {
    questionText: 'Which CSS property is used for responsive design?',
    options: {
      A: 'flex',
      B: 'grid',
      C: 'media queries',
      D: 'All of the above'
    },
    correctOption: 'D',
    difficulty: 'medium',
    category: 'CSS'
  },
  {
    questionText: 'What is the difference between "let" and "var" in JavaScript?',
    options: {
      A: 'let has block scope, var has function scope',
      B: 'var has block scope, let has function scope',
      C: 'No difference',
      D: 'let is older syntax'
    },
    correctOption: 'A',
    difficulty: 'medium',
    category: 'JavaScript'
  },
  {
    questionText: 'Which HTTP status code indicates "Not Found"?',
    options: {
      A: '200',
      B: '404',
      C: '500',
      D: '403'
    },
    correctOption: 'B',
    difficulty: 'medium',
    category: 'Web Development'
  },
  {
    questionText: 'What is the purpose of package.json in Node.js?',
    options: {
      A: 'To manage dependencies',
      B: 'To store code',
      C: 'To run the server',
      D: 'To compile JavaScript'
    },
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Node.js'
  },
  {
    questionText: 'Which method is used to add an element at the end of an array in JavaScript?',
    options: {
      A: 'pop()',
      B: 'push()',
      C: 'shift()',
      D: 'unshift()'
    },
    correctOption: 'B',
    difficulty: 'medium',
    category: 'JavaScript'
  },
  {
    questionText: 'What does CORS stand for?',
    options: {
      A: 'Cross-Origin Resource Sharing',
      B: 'Cross-Object Resource Sharing',
      C: 'Client-Origin Resource Sharing',
      D: 'Cross-Origin Request Security'
    },
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Web Development'
  },
  {
    questionText: 'Which React hook is used for side effects?',
    options: {
      A: 'useState',
      B: 'useEffect',
      C: 'useContext',
      D: 'useReducer'
    },
    correctOption: 'B',
    difficulty: 'medium',
    category: 'React'
  },
  {
    questionText: 'What is the box model in CSS?',
    options: {
      A: 'A model for creating boxes',
      B: 'Content, padding, border, and margin',
      C: 'A JavaScript library',
      D: 'A database schema'
    },
    correctOption: 'B',
    difficulty: 'medium',
    category: 'CSS'
  },
  {
    questionText: 'Which operator is used for strict equality in JavaScript?',
    options: {
      A: '=',
      B: '==',
      C: '===',
      D: '!='
    },
    correctOption: 'C',
    difficulty: 'medium',
    category: 'JavaScript'
  },
  {
    questionText: 'What is the purpose of Git?',
    options: {
      A: 'Version control',
      B: 'Code compilation',
      C: 'Web hosting',
      D: 'Database management'
    },
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Tools'
  },
  {
    questionText: 'Which keyword is used to create a class in JavaScript?',
    options: {
      A: 'function',
      B: 'class',
      C: 'object',
      D: 'prototype'
    },
    correctOption: 'B',
    difficulty: 'medium',
    category: 'JavaScript'
  },
  {
    questionText: 'What is JWT used for?',
    options: {
      A: 'Authentication',
      B: 'Styling',
      C: 'Database queries',
      D: 'File uploads'
    },
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Security'
  },
  {
    questionText: 'Which CSS preprocessor extends CSS with variables and functions?',
    options: {
      A: 'LESS',
      B: 'SASS',
      C: 'Stylus',
      D: 'All of the above'
    },
    correctOption: 'D',
    difficulty: 'medium',
    category: 'CSS'
  },
  {
    questionText: 'What is the default port for HTTPS?',
    options: {
      A: '80',
      B: '443',
      C: '8080',
      D: '3000'
    },
    correctOption: 'B',
    difficulty: 'medium',
    category: 'Networking'
  },

  // ==================== HARD QUESTIONS (20) ====================
  {
    questionText: 'What is the output of: typeof null in JavaScript?',
    options: {
      A: 'null',
      B: 'undefined',
      C: 'object',
      D: 'number'
    },
    correctOption: 'C',
    difficulty: 'hard',
    category: 'JavaScript'
  },
  {
    questionText: 'What is the virtual DOM in React?',
    options: {
      A: 'A lightweight copy of the actual DOM',
      B: 'A database',
      C: 'A styling library',
      D: 'A testing framework'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'React'
  },
  {
    questionText: 'Which design pattern is commonly used in Redux?',
    options: {
      A: 'MVC',
      B: 'Flux',
      C: 'Observer',
      D: 'Singleton'
    },
    correctOption: 'B',
    difficulty: 'hard',
    category: 'React'
  },
  {
    questionText: 'What is event bubbling in JavaScript?',
    options: {
      A: 'Events propagate from child to parent',
      B: 'Events propagate from parent to child',
      C: 'Events stop at the target',
      D: 'Events are delayed'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'JavaScript'
  },
  {
    questionText: 'What is the purpose of the "this" keyword in JavaScript?',
    options: {
      A: 'Refers to the global object',
      B: 'Refers to the current execution context',
      C: 'Refers to the parent function',
      D: 'Refers to the DOM'
    },
    correctOption: 'B',
    difficulty: 'hard',
    category: 'JavaScript'
  },
  {
    questionText: 'Which algorithm does Git use for version control?',
    options: {
      A: 'Merkle tree',
      B: 'Binary search tree',
      C: 'Hash table',
      D: 'Directed acyclic graph'
    },
    correctOption: 'D',
    difficulty: 'hard',
    category: 'Tools'
  },
  {
    questionText: 'What is a closure in JavaScript?',
    options: {
      A: 'A function that closes the browser',
      B: 'A function with access to its outer scope',
      C: 'A way to end a loop',
      D: 'A database connection'
    },
    correctOption: 'B',
    difficulty: 'hard',
    category: 'JavaScript'
  },
  {
    questionText: 'What is the time complexity of binary search?',
    options: {
      A: 'O(n)',
      B: 'O(log n)',
      C: 'O(n^2)',
      D: 'O(1)'
    },
    correctOption: 'B',
    difficulty: 'hard',
    category: 'Algorithms'
  },
  {
    questionText: 'What is the difference between SQL and NoSQL databases?',
    options: {
      A: 'SQL is relational, NoSQL is non-relational',
      B: 'NoSQL is relational, SQL is non-relational',
      C: 'No difference',
      D: 'SQL is newer'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Database'
  },
  {
    questionText: 'What is hoisting in JavaScript?',
    options: {
      A: 'Moving code to a server',
      B: 'Variable and function declarations moved to top',
      C: 'Optimizing performance',
      D: 'Error handling'
    },
    correctOption: 'B',
    difficulty: 'hard',
    category: 'JavaScript'
  },
  {
    questionText: 'Which HTTP method is idempotent?',
    options: {
      A: 'POST',
      B: 'PUT',
      C: 'PATCH',
      D: 'All of the above'
    },
    correctOption: 'B',
    difficulty: 'hard',
    category: 'Web Development'
  },
  {
    questionText: 'What is the event loop in Node.js?',
    options: {
      A: 'A loop that handles asynchronous operations',
      B: 'A database connection pool',
      C: 'A styling framework',
      D: 'A testing library'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Node.js'
  },
  {
    questionText: 'What is the purpose of middleware in Express.js?',
    options: {
      A: 'To process requests before reaching routes',
      B: 'To style the application',
      C: 'To create databases',
      D: 'To compile JavaScript'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Express.js'
  },
  {
    questionText: 'What is the CAP theorem in distributed systems?',
    options: {
      A: 'Consistency, Availability, Partition tolerance',
      B: 'Cache, API, Performance',
      C: 'Code, Architecture, Pattern',
      D: 'Client, API, Protocol'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'System Design'
  },
  {
    questionText: 'What is prototypal inheritance in JavaScript?',
    options: {
      A: 'Objects inherit from other objects',
      B: 'Classes inherit from classes',
      C: 'Functions inherit from functions',
      D: 'Variables inherit from variables'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'JavaScript'
  },
  {
    questionText: 'What is the purpose of useCallback hook in React?',
    options: {
      A: 'To memoize functions',
      B: 'To create side effects',
      C: 'To manage state',
      D: 'To handle errors'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'React'
  },
  {
    questionText: 'What is CSRF attack?',
    options: {
      A: 'Cross-Site Request Forgery',
      B: 'Cross-Site Resource Forgery',
      C: 'Client-Side Request Failure',
      D: 'Cross-Server Request Failure'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Security'
  },
  {
    questionText: 'What is the difference between TCP and UDP?',
    options: {
      A: 'TCP is reliable, UDP is unreliable',
      B: 'UDP is reliable, TCP is unreliable',
      C: 'No difference',
      D: 'TCP is faster'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Networking'
  },
  {
    questionText: 'What is lazy loading in React?',
    options: {
      A: 'Loading components only when needed',
      B: 'Loading all components at once',
      C: 'Delaying API calls',
      D: 'Caching data'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'React'
  },
  {
    questionText: 'What is the purpose of IndexedDB?',
    options: {
      A: 'Client-side storage for large amounts of data',
      B: 'Server-side database',
      C: 'In-memory cache',
      D: 'CSS preprocessing'
    },
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Web APIs'
  }
];

/**
 * Seed database with 60 questions
 */
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Initialize database
    await initializeDatabase();

    // Check if questions already exist
    const existingCount = await Question.count();
    
    if (existingCount > 0) {
      console.log(`⚠️  Database already contains ${existingCount} questions`);
      console.log('Deleting existing questions...');
      
      // Delete existing questions
      await Question.deleteAll();
      console.log('✅ Existing questions deleted');
    }

    // Insert sample questions
    console.log(`📝 Inserting ${sampleQuestions.length} sample questions...`);
    
    let easyCount = 0, mediumCount = 0, hardCount = 0;
    
    for (const question of sampleQuestions) {
      await Question.create(question);
      if (question.difficulty === 'easy') easyCount++;
      if (question.difficulty === 'medium') mediumCount++;
      if (question.difficulty === 'hard') hardCount++;
    }

    const finalCount = await Question.count();
    console.log(`✅ Database seeded successfully with ${finalCount} questions!`);
    console.log(`   📊 Easy: ${easyCount} | Medium: ${mediumCount} | Hard: ${hardCount}`);
    console.log('🎉 Quiz will randomly select 5 easy, 5 medium, and 5 hard questions');
    console.log('🚀 You can now start the server with: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();
