import {
  Home,
  User,
  BookOpen,
  GraduationCap,
  DollarSign,
  CreditCard,
  Globe,
  RefreshCw,
  CheckSquare,
  Calendar,
  HelpCircle,
  FileText,
  Bus,
  Monitor,
  Bell,
  Info,
  LogOut 
} from "lucide-react";

export const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "conta", label: "Minha Conta", icon: User },
  { id: "cursos", label: "Meus Cursos", icon: BookOpen },
  { id: "academica", label: "Vida Acadêmica", icon: GraduationCap },
  { id: "financeiro", label: "Financeiro", icon: DollarSign },
  { id: "mensalidade", label: "Pagar Mensalidade", icon: CreditCard },
  { id: "caa", label: "CAA Online", icon: Globe },
  { id: "rematricula", label: "Rematrícula", icon: RefreshCw },
  { id: "atividades", label: "Atividades Complementares", icon: CheckSquare },
  { id: "agendamento", label: "Agendamento Presencial", icon: Calendar },
  { id: "tutorial", label: "Tutorial", icon: HelpCircle },
  { id: "emissao", label: "Emissão de Documentos", icon: FileText },
  { id: "sptrans", label: "SPTrans", icon: Bus },
  {
    id: "ambiente",
    label: "ACESSO AO\nAMBIENTE VIRTUAL",
    icon: Monitor,
    isHighlight: true,
  },
  { id: "avisos", label: "Avisos", icon: Bell },
  { id: "ajuda", label: "Ajuda", icon: Info },
  { id: "sair", label: "Sair", icon: LogOut },
];

export const welcomeCapabilities = [
  { icon: GraduationCap, label: "Informações acadêmicas" },
  { icon: DollarSign, label: "Questões financeiras" },
  { icon: FileText, label: "Emissão de documentos" },
  { icon: CreditCard, label: "Carteirinha de estudante" },
  { icon: BookOpen, label: "Serviços da biblioteca" },
  { icon: Calendar, label: "Agendamento presencial" },
];
