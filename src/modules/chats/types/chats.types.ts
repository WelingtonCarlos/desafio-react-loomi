export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: "user_message" | "assistant_message" | "ai_suggestion";
}

export interface ChatInsight {
  id: string;
  type: "interaction" | "emotionAnalysis" | "clusterIdentification";
  category: string;
}

export interface ChatAction {
  id: string;
  action: string;
  priority: "high" | "medium" | "low";
}

export interface ChatConversationAnalysis {
  insights: {
    title: string;
    insights: ChatInsight[];
  };
  futureSteps: {
    title: string;
    actions: ChatAction[];
  };
}

export interface ChatTranscript {
  messages: ChatMessage[];
  iaSuggestion: string;
  conversationAnalysis: ChatConversationAnalysis;
}

export type ChatsData = ChatTranscript;
