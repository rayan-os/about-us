import { ReactNode } from "react";

export enum MessageSenderEnum {
  USER = "user",
  BOT = "bot",
}

export type MessageSenderType = `${MessageSenderEnum}`;

export interface MessageProps {
  sender: MessageSenderType;
  message?: string | ReactNode;
  agent?: AgentEnum;
  username?: string;
  country?: string;
  placeholder?: number;
  scroll?: boolean;
  fullWidth?: boolean;
}

export enum AgentEnum {
  JACKIE = "JACKIE",
  ELLA = "ELLA",
  SUPPORT = "SUPPORT",
  DAVID = "DAVID",
}

export type AgentType = `${AgentEnum}`;

export interface AgentProps {
  name: AgentType;
  image: string;
}

export interface SectionProps {
  name: AgentType;
  subTitle: string;
  description: string;
  messages: MessageProps[];
  color: string;
  avatar?: string;
}

export enum TabsEnum {
  SCHOOLS = "SCHOOLS",
  NURSE = "NURSE",
  BANK = "BANK",
  LENDERS = "LENDERS",
  EMPLOYERS = "EMPLOYERS",
}

export type TabType = `${TabsEnum}`;

export interface TabProps {
  name: TabType;
  subTitle: string;
  description: string;
  sections: SectionProps[];
}

export interface MessageElement extends HTMLElement {
  _layerIndex?: number;
  _baseZ?: number;
  _hoverZ?: number;
  _parallaxMultiplier?: number;
  _bubble?: HTMLElement;
  _transformCache?: string;
}

export interface CachedRect {
  left: number;
  top: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export interface PrecomputedValues {
  normalizedX: number;
  normalizedY: number;
  rotateX: number;
  rotateY: number;
}
