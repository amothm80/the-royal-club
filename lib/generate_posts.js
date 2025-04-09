import { savePost } from "../model/posts.js";

const messageBoardPosts = [
    {
      subject: "Lost Dog in Maplewood",
      content: "My golden retriever, Max, went missing last night near Oak and 5th. He's friendly and has a blue collar. Please let me know if you see him.",
      user: 3
    },
    {
      subject: "Free Couch - Must Pick Up",
      content: "Giving away a gently used gray couch. No rips or stains. First come, first served!",
      user: 1
    },
    {
      subject: "Looking for Local Book Club",
      content: "Does anyone know of a book club that meets in the evenings around the Westside area?",
      user: 4
    },
    {
      subject: "Lawn Mower Recommendations?",
      content: "Looking to buy a reliable electric lawn mower. Any suggestions from experience?",
      user: 2
    },
    {
      subject: "Carpool to Downtown",
      content: "I commute to downtown daily (Mon–Fri) from Northside. Anyone interested in carpooling?",
      user: 3
    },
    {
      subject: "Kids' Soccer Coach Needed",
      content: "Our U10 team is looking for a volunteer coach for the upcoming season. Practices are twice a week.",
      user: 1
    },
    {
      subject: "Found Set of Keys",
      content: "Found a set of keys near the grocery store parking lot. One has a red tag labeled “Tom’s Garage.”",
      user: 2
    },
    {
      subject: "Anyone Selling a Mini Fridge?",
      content: "I’m looking for a mini fridge for my dorm. Budget is around $50. Let me know if you have one!",
      user: 4
    },
    {
      subject: "Bake Sale This Saturday!",
      content: "Come support our school band at the bake sale in front of the library, 10am–2pm!",
      user: 1
    },
    {
      subject: "Need Help Setting Up Wi-Fi Router",
      content: "I just moved in and can’t figure out how to set up my new router. Anyone tech-savvy who can help?",
      user: 2
    },
    {
      subject: "Community Garden Volunteers Wanted",
      content: "We’re prepping plots this weekend and need some help. Come get your hands dirty!",
      user: 3
    },
    {
      subject: "Looking for a Piano Teacher",
      content: "Seeking a patient piano teacher for my 7-year-old. Preferably within a 10-mile radius.",
      user: 1
    },
    {
      subject: "Rain Barrel Recommendations?",
      content: "Thinking of installing a rain barrel. Anyone have a brand they love?",
      user: 4
    },
    {
      subject: "Block Party Planning Meeting",
      content: "We’re organizing this year’s block party. Join us Wednesday at 6pm at the community center!",
      user: 2
    },
    {
      subject: "Gym Buddy Wanted",
      content: "I’m trying to get back in shape and looking for a workout partner at FitZone. Anyone interested?",
      user: 3
    },
    {
      subject: "Free Firewood Available",
      content: "Just cut down a tree. Logs are stacked and ready to go. Bring a truck!",
      user: 1
    },
    {
      subject: "Anyone Use a Rainwater Irrigation System?",
      content: "Curious if it’s worth the investment. Would love to hear pros and cons.",
      user: 4
    },
    {
      subject: "Kids' Bike for Sale",
      content: "Selling a 20” kid’s bike in great condition. $40 or best offer.",
      user: 2
    },
    {
      subject: "Recycling Bin Mix-Up",
      content: "I think someone took my recycling bin by mistake. Mine has a faded sunflower sticker on the lid.",
      user: 3
    },
    {
      subject: "Dog Walker Needed",
      content: "Looking for someone to walk my dog twice a day during the week while I’m at work.",
      user: 1
    }
  ];
  
  
  messageBoardPosts.forEach(post=>{
    //console.log(post)
    savePost(post.subject, post.content, post.user)
  })