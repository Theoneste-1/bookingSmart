import { LiveChat } from "@/components/realtime/live-chart"

const mockParticipants = [
  {
    id: "user1",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "client" as const,
    isOnline: true,
  },
  {
    id: "user2",
    name: "Dr. Sarah Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "professional" as const,
    isOnline: true,
  },
]

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Messages</h1>
        <p className="text-slate-600 dark:text-slate-300">Real-time chat with your clients</p>
      </div>

      <LiveChat chatId="chat_123" currentUserId="user2" participants={mockParticipants} />
    </div>
  )
}
