"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, MessageSquare, PlusCircle, Trash2, Edit2, X, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { deleteChatSession, updateChatSessionName } from "../actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ChatSession = {
  id: string;
  name: string;
  updatedAt: string;
  messages: any[];
};

export default function Sidebar({
  activeChatId,
  onChatSelect,
  onNewChat,
}: {
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
  onNewChat: () => void;
}) {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newSessionName, setNewSessionName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchChatSessions();
  }, [activeChatId]);

  useEffect(() => {
    if (editingSessionId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingSessionId]);

  const fetchChatSessions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/chat/sessions");
      const data = await response.json();

      if (data.chatSessions) {
        setChatSessions(data.chatSessions);
      }
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
  };

  const openDeleteDialog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSession = async () => {
    if (!sessionToDelete) return;
    
    try {
      await deleteChatSession(sessionToDelete);
      // Refresh chat sessions after deletion
      fetchChatSessions();
      // If active chat was deleted, clear selection
      if (activeChatId === sessionToDelete) {
        onNewChat();
      }
    } catch (error) {
      console.error("Error deleting chat session:", error);
      alert("Failed to delete chat. Please try again.");
    } finally {
      setDeleteDialogOpen(false);
      setSessionToDelete(null);
    }
  };

  const startRenaming = (id: string, currentName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(id);
    setNewSessionName(currentName);
  };

  const cancelRenaming = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(null);
  };

  const handleRename = async (id: string, e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (newSessionName.trim() === "") return;
    
    try {
      await updateChatSessionName(id, newSessionName.trim());
      setEditingSessionId(null);
      fetchChatSessions();
    } catch (error) {
      console.error("Error renaming chat session:", error);
      alert("Failed to rename chat. Please try again.");
    }
  };

  return (
    <>
      <div className="w-80 bg-zinc-100 border-r border-zinc-200 flex flex-col">
        <div className="p-4 border-b border-zinc-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                asChild
                size="icon"
                className="text-[#5a4a42] hover:bg-[#5a4a42]/10 rounded-full w-10 h-10"
              >
                <Link href="/dashboard">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <button
            className="w-full flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            onClick={onNewChat}
          >
            <PlusCircle size={18} />
            <span>New Conversation</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-3">
              Recent Chats
            </h3>
          </div>
          <div className="space-y-1 px-3">
            {isLoading ? (
              <div className="p-4 text-center text-zinc-500">Loading...</div>
            ) : chatSessions.length === 0 ? (
              <div className="p-4 text-center text-zinc-500">
                No chat history yet
              </div>
            ) : (
              chatSessions.map((chat) => (
                <div
                  key={chat.id}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    chat.id === activeChatId
                      ? "bg-green-100 text-green-800"
                      : "text-zinc-700 hover:bg-zinc-200"
                  }`}
                  onClick={() => editingSessionId !== chat.id && onChatSelect(chat.id)}
                >
                  <MessageSquare
                    size={18}
                    className={
                      chat.id === activeChatId
                        ? "text-green-600"
                        : "text-zinc-500"
                    }
                  />
                  <div className="ml-3 flex-1 truncate">
                    {editingSessionId === chat.id ? (
                      <form onSubmit={(e) => handleRename(chat.id, e)} className="flex items-center">
                        <input
                          ref={inputRef}
                          type="text"
                          value={newSessionName}
                          onChange={(e) => setNewSessionName(e.target.value)}
                          className="flex-1 p-1 text-sm border border-green-400 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button 
                          type="submit" 
                          className="ml-1 text-green-600 hover:text-green-800"
                          onClick={(e) => handleRename(chat.id, e)}
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          type="button" 
                          className="ml-1 text-zinc-500 hover:text-zinc-700"
                          onClick={cancelRenaming}
                        >
                          <X size={16} />
                        </button>
                      </form>
                    ) : (
                      <>
                        <p className="font-medium">{chat.name}</p>
                        <p className="text-xs text-zinc-500">
                          {formatDate(chat.updatedAt)}
                        </p>
                      </>
                    )}
                  </div>
                  {editingSessionId !== chat.id && (
                    <div className="flex ml-2 opacity-0 group-hover:opacity-100 hover:opacity-100">
                      <button
                        className="p-1 text-zinc-500 hover:text-green-600 transition-colors"
                        onClick={(e) => startRenaming(chat.id, chat.name, e)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="p-1 text-zinc-500 hover:text-red-600 transition-colors"
                        onClick={(e) => openDeleteDialog(chat.id, e)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="p-4 border-t border-zinc-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-zinc-500">
              <p>WellHaven v1.2.0</p>
            </div>
            <button className="text-xs text-green-600 hover:text-green-700">
              Help & Support
            </button>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chat? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSession} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}