export function generateVoteMessage(babyName: string, contestName: string, organizer: string, voteLink: string): string {
  return `
  **🌟 Vote for ${babyName} in the "${contestName}" by ${organizer}! 🌟**  
  
  Hi there! 👋  
  
  We’re thrilled to be part of the **${contestName}** organized by **${organizer}**! 🍼✨ Our little star is shining bright, and with your love and support, we can win!  
  
  💖 **Every vote counts!** Please take a moment to **vote for us** by clicking the link below:  
  
  🔗 **${voteLink}**  
  
  Your support means the world to us! Thank you so much! 🥰🙏  
  
  #VoteFor${babyName} #${contestName.replace(/\s+/g, "")} #SupportUs  
  `;
}
