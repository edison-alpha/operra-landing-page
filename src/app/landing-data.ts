type EcosystemPartner = {
  name: string
  href: string
  logo: string
  wordmark?: boolean
  monochrome?: boolean
}

// The organizer's HACKATHON.md lists ecosystem resources, not OPERRA sponsors.
export const ECOSYSTEM_PARTNERS: EcosystemPartner[] = [
  { name: "NEAR Intents", href: "https://intents.near.org/", logo: "near-intents.svg", wordmark: true, monochrome: true },
  { name: "Aurora", href: "https://aurora.dev/", logo: "aurora.svg", monochrome: true },
  { name: "HOT", href: "https://hot-labs.org/", logo: "hot.svg", wordmark: true, monochrome: true },
  { name: "Rhea", href: "https://rhea.finance/", logo: "rhea.svg" },
  { name: "meme.cooking", href: "https://meme.cooking/", logo: "meme-cooking.png" },
  { name: "HEX", href: "https://hex.exchange/", logo: "hex.png" },
  { name: "NEAR.AI", href: "https://near.ai/", logo: "near-ai.svg", wordmark: true, monochrome: true },
  { name: "SVRN", href: "https://svrn.net/", logo: "svrn.svg", wordmark: true, monochrome: true },
  { name: "Trezu", href: "https://trezu.org/", logo: "trezu.svg" },
  { name: "SputnikDAO", href: "https://x.com/SputnikDAO", logo: "sputnik-dao.png" },
  { name: "OutLayer", href: "https://outlayer.ai/", logo: "outlayer.png", wordmark: true },
  { name: "GoMining", href: "https://gomining.com/", logo: "gomining.svg", wordmark: true, monochrome: true },
  { name: "Agent Market", href: "https://market.near.ai/", logo: "agent-market.svg" },
  { name: "NEAR Builders", href: "https://nearbuilders.org/", logo: "near-builders.png" },
  { name: "Gulf Labs", href: "https://gulf-labs.com/", logo: "gulf-labs.svg", wordmark: true, monochrome: true },
  { name: "BRRRAIN", href: "https://brrrain.fun/", logo: "brrrain.svg" },
  { name: "NEAR Business", href: "https://business.near.com/", logo: "near-business.svg" },
]

type NavigationItem = { title: string; description: string; href: string; icon: "office" | "docs" | "human" | "agent" | "chat" | "calendar" | "collaborate" | "verify" | "settle" | "identity" | "nft" | "connection"; tone: "coral" | "mint" | "blue" | "amber"; planned?: boolean }
type NavigationMenu = { id: string; label: string; title: string; description: string; items: NavigationItem[] }

export const NAVIGATION_MENUS: NavigationMenu[] = [
  {
    id: "workspace", label: "Workspace", title: "Make yourself at home.",
    description: "One shared place for your team, its conversations, and the knowledge you build together.",
    items: [
      { title: "Pixel office", description: "Be present with your team.", href: "/app", icon: "office", tone: "coral" },
      { title: "OperraDocs", description: "Write, share, and find the context.", href: "/docs", icon: "docs", tone: "mint" },
      { title: "Conversations", description: "Talk where the work happens.", href: "#workspace", icon: "chat", tone: "blue" },
      { title: "Meetings & calendar", description: "Make time to work together.", href: "#workspace", icon: "calendar", tone: "amber" },
    ],
  },
  {
    id: "workflow", label: "Workflow", title: "Keep the work moving.",
    description: "Start with context, bring in the right contribution, and carry the result forward.",
    items: [
      { title: "Brief", description: "Give the work a clear starting point.", href: "#workflow-1", icon: "docs", tone: "coral" },
      { title: "Collaborate", description: "Bring human and agent skills together.", href: "#workflow-2", icon: "collaborate", tone: "blue", planned: true },
      { title: "Verify", description: "Review the evidence and the result.", href: "#workflow-3", icon: "verify", tone: "mint", planned: true },
      { title: "Settle & continue", description: "Accept the contribution and move on.", href: "#workflow-4", icon: "settle", tone: "amber", planned: true },
    ],
  },
  {
    id: "identity", label: "Identity", title: "A familiar face. Your own identity.",
    description: "Create a recognizable avatar today. Human and agent NFT identities are the next chapter.",
    items: [
      { title: "Human avatar", description: "Make your character your own.", href: "/app", icon: "human", tone: "coral" },
      { title: "Agent identity", description: "Give your agent a place in the team.", href: "#identity", icon: "identity", tone: "mint", planned: true },
      { title: "Avatar NFTs", description: "Explore the NEAR ownership roadmap.", href: "#identity", icon: "nft", tone: "amber", planned: true },
      { title: "MCP connection", description: "See how agents will join the office.", href: "#agents", icon: "connection", tone: "blue", planned: true },
    ],
  },
]
