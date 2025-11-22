"use client";

import { Phone, Mail, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useView360Data } from "../hooks/useView360Data";
import { SkeletonClientInfoSidebar } from "./skeleton-view-360";

export function ClientInfoSidebar() {
  const { data: view360Data, isLoading: isLoadingView360Data } =
    useView360Data();

  const client = view360Data?.client;
  const produtos = view360Data?.produtos;
  const profile = view360Data?.profile;
  const capturedPhrases = view360Data?.capturedPhrases;
  const appActions = view360Data?.appActions;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoadingView360Data) return <SkeletonClientInfoSidebar />;

  return (
    <div className="bg-linear-to-br from-[#28335098] via-[#28335098 ]/60 to-[#28335098 ]/10 border border-white/5 rounded-2xl p-6 space-y-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-medium">
          {getInitials(client?.name || "")}
        </div>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-lg font-medium text-white">{client?.name}</h2>
          <p className="text-sm text-gray-400">{client?.clientType}</p>
        </div>
        <div className="flex flex-col 2xl:flex-row gap-2 w-full">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-gray-400 hover:text-white"
          >
            <Phone className="w-4 h-4 mr-1" />
            Telefonar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-gray-400 hover:text-white"
          >
            <Mail className="w-4 h-4 mr-1" />
            Enviar e-mail
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-gray-400 hover:text-white"
          >
            <Eye className="w-4 h-4 mr-1" />
            Ver mais
          </Button>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-white">Produtos</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-400 hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {produtos?.map((produto, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    produto.status === "Ativo"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                />
                <span className="text-gray-300">{produto.name}</span>
              </div>
              <span className="text-white font-medium">
                R$ {produto.value.toFixed(2)}/mês
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Tags */}
      <div>
        <h3 className="text-sm font-medium text-white mb-3">Perfil</h3>
        <div className="flex flex-wrap gap-2">
          {profile?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Captured Phrases */}
      <div>
        <h3 className="text-sm font-medium text-white mb-3">Frases captadas</h3>
        <div className="space-y-3">
          {capturedPhrases?.map((item, index) => (
            <div
              key={index}
              className="bg-[#0f1623] p-3 rounded-lg border border-white/5"
            >
              <p className="text-sm text-gray-300 italic mb-1">
                "{item.phrase}"
              </p>
              <p className="text-xs text-gray-500">
                Atendimento do dia{" "}
                {new Date(item.serviceDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* App Actions */}
      <div>
        <h3 className="text-sm font-medium text-white mb-3">Ações no app</h3>
        <div className="space-y-3">
          {appActions?.map((action, index) => (
            <div key={index}>
              <p className="text-xs text-gray-400 mb-1">{action.accessed}</p>
              <p className="text-sm text-gray-300">{action.action}</p>
              {action.pageTime && (
                <p className="text-xs text-gray-500">
                  Tempo na página {action.pageTime}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
