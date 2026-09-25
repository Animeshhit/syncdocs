export interface TemplateType {
  name: string;
  initialContent: string;
  thumbnail: string;
}

export const templates: TemplateType[] = [
  {
    name: "Blank document",
    initialContent: "",
    thumbnail: "/Blank.png",
  },
  {
    name: "Resume",
    initialContent: `
      <h1>Your Name</h1>
      <p>Email: your.email@example.com | Phone: (123) 456-7890 | Location: City, Country</p>
      <hr>
      <h2>Summary</h2>
      <p>A brief 2-3 sentence overview of your professional background, key skills, and career goals.</p>
      <h2>Experience</h2>
      <p><strong>Job Title</strong> — Company Name (Month Year – Present)</p>
      <ul>
        <li>Key responsibility or achievement</li>
        <li>Key responsibility or achievement</li>
        <li>Key responsibility or achievement</li>
      </ul>
      <p><strong>Job Title</strong> — Company Name (Month Year – Month Year)</p>
      <ul>
        <li>Key responsibility or achievement</li>
        <li>Key responsibility or achievement</li>
      </ul>
      <h2>Education</h2>
      <p><strong>Degree</strong> — University Name (Year)</p>
      <h2>Skills</h2>
      <p>Skill 1, Skill 2, Skill 3, Skill 4, Skill 5</p>
    `,
    thumbnail: "/resume.png",
  },
  {
    name: "Letter",
    initialContent: `
      <p>Your Name<br>Your Address<br>City, State ZIP</p>
      <p>Date</p>
      <p>Recipient Name<br>Recipient Address<br>City, State ZIP</p>
      <p>Dear [Recipient Name],</p>
      <p>Begin your letter here. State the purpose of your letter in the opening paragraph.</p>
      <p>Use the following paragraphs to provide more detail and supporting information.</p>
      <p>Close with a brief summary or call to action.</p>
      <p>Sincerely,<br>Your Name</p>
    `,
    thumbnail: "/Letter.png",
  },
  {
    name: "Project",
    initialContent: `
      <h1>Project Name</h1>
      <p><strong>Owner:</strong> Name &nbsp; <strong>Status:</strong> In Progress &nbsp; <strong>Due Date:</strong> Month Day, Year</p>
      <h2>Overview</h2>
      <p>Describe the goal and scope of this project in a few sentences.</p>
      <h2>Objectives</h2>
      <ul>
        <li>Objective one</li>
        <li>Objective two</li>
        <li>Objective three</li>
      </ul>
      <h2>Timeline</h2>
      <ul>
        <li>Milestone 1 — Date</li>
        <li>Milestone 2 — Date</li>
        <li>Milestone 3 — Date</li>
      </ul>
      <h2>Tasks</h2>
      <ul>
        <li>Task item</li>
        <li>Task item</li>
      </ul>
      <h2>Notes</h2>
      <p>Additional notes or considerations.</p>
    `,
    thumbnail: "/Project.png",
  },
  {
    name: "Brochure",
    initialContent: `
      <h1>Business or Event Name</h1>
      <p><em>A short, catchy tagline goes here.</em></p>
      <hr>
      <h2>About Us</h2>
      <p>Write a short paragraph introducing your business, product, or event to the reader.</p>
      <h2>What We Offer</h2>
      <ul>
        <li>Feature or service one</li>
        <li>Feature or service two</li>
        <li>Feature or service three</li>
      </ul>
      <h2>Why Choose Us</h2>
      <p>Highlight what makes you different — benefits, unique value, testimonials, etc.</p>
      <h2>Contact Us</h2>
      <p>Address: 123 Main Street, City, Country<br>
      Phone: (123) 456-7890<br>
      Email: info@example.com<br>
      Website: www.example.com</p>
    `,
    thumbnail: "/Brochure.png",
  },
  {
    name: "Recipe",
    initialContent: `
      <h1>Recipe Name</h1>
      <p><strong>Prep Time:</strong> 10 min &nbsp; <strong>Cook Time:</strong> 20 min &nbsp; <strong>Servings:</strong> 4</p>
      <h2>Ingredients</h2>
      <ul>
        <li>1 cup ingredient</li>
        <li>2 tbsp ingredient</li>
        <li>1 tsp ingredient</li>
        <li>Salt and pepper to taste</li>
      </ul>
      <h2>Instructions</h2>
      <ol>
        <li>First step of the recipe.</li>
        <li>Second step of the recipe.</li>
        <li>Third step of the recipe.</li>
        <li>Serve and enjoy!</li>
      </ol>
      <h2>Notes</h2>
      <p>Optional tips, substitutions, or storage instructions.</p>
    `,
    thumbnail: "/recipe.png",
  },
  {
    name: "Newsletter",
    initialContent: `
      <h1>Newsletter Title</h1>
      <p><em>Issue #1 — Month Year</em></p>
      <hr>
      <h2>Welcome</h2>
      <p>A short introduction welcoming readers and summarizing what's inside this issue.</p>
      <h2>Highlights</h2>
      <ul>
        <li>Highlight or update one</li>
        <li>Highlight or update two</li>
        <li>Highlight or update three</li>
      </ul>
      <h2>Featured Story</h2>
      <p>Write your main article or announcement here. Keep it engaging and to the point.</p>
      <h2>Upcoming Events</h2>
      <ul>
        <li>Event name — Date</li>
        <li>Event name — Date</li>
      </ul>
      <p><em>Thanks for reading! See you next issue.</em></p>
    `,
    thumbnail: "/newsletter.png",
  },
];
