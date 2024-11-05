const questions = [
  {
    id: 1,
    type: "text",
    label: "Full Name",
    required: true,
  },
  {
    id: 2,
    type: "radio",
    label: "Year of Study",
    options: ["1st Year", "2nd Year"],
    required: true,
  },
  {
    id: 3,
    type: "text",
    label: "Whatsapp Number",
    required: true,
  },
  {
    id: 4,
    type: "radio",
    label: "Department",
    options: [
      "Computer Science and Engineering",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Biotechnology",
      "Chemical Engineering",
      "Metallurgical and Material Engineering",
      "Chemistry",
    ],
    required: true,
  },
  {
    id: 5,
    type: "rating",
    label: "Rate yourself out of 10 (10 being highest and 1 being lowest)",
    fields: [
      "Time management",
      "Confidence",
      "Ego",
      "Hardwork",
      "Creativity",
      "Teamwork",
      "Leadership",
      "Intelligence",
    ],
    required: true,
  },
  {
    id: 6,
    type: "checkbox",
    label: "Interested In",
    options: [
      "Graphic Design",
      "Event Management & Content Writing",
      "Web Development",
      "Robotics/Data Science",
      "Video Editing",
      "Speaker/Presenter",
    ],
  },
  {
    id: 7,
    type: "textarea",
    label:
      "Q1. What are your club preferences amongst all the clubs that the college has?",
    required: true,
  },
  {
    id: 8,
    type: "textarea",
    label:
      "Q2. You're working on a complex project with your team, but another member consistently misses deadlines and contributes minimally. How do you address this situation while maintaining a positive and productive team environment?",
    required: true,
  },
  {
    id: 9,
    type: "textarea",
    label: "Q3. What are you hoping to gain from being a member of this club?",
    required: true,
  },
  {
    id: 10,
    type: "textarea",
    label: "Q4. Can we call a calculator a computer?",
    required: true,
  },
  {
    id: 11,
    type: "textarea",
    label:
      "Q5. What kind of events/workshops/webinars would you like us to organize? Do you think it will be beneficial for the club and why?",
    required: true,
  },
  {
    id: 12,
    type: "textarea",
    label:
      "Q6. If you could teleport anywhere in the world right now, with five minutes to spend, where do you go and what do you do?",
    required: true,
  },
  {
    id: 13,
    type: "textarea",
    label: "Q7. What if everyone on earth jumped at once?",
    required: true,
  },
  {
    id: 14,
    type: "textarea",
    label:
      "Q8. You have a crush on a good friend of yours, who is reluctant to audition for IEEE SB NITDGP. After a lot of convincing, she/he eventually auditions for IEEE SB NITDGP. You make it to the next round with positive feedback. However, your crush is not selected after the first interview round and is very upset, developing negative thoughts about the club. How would you navigate this situation and maintain your friendship with them while also striving to do your best in the next round of the audition?",
    required: true,
  },
];

export { questions };
