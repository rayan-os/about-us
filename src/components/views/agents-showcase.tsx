"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Clock,
  CreditCard,
  FileCheck,
  HeadphonesIcon,
  MessageCircle,
  Star,
  UserCheck,
} from "lucide-react";

const agents = [
  {
    id: "jackie",
    name: "Jackie",
    title: "AI counselor",
    specialty: "Guidance & Document Preparation",
    description:
      "Jackie provides personalized counseling, helps with document preparation, and guides applicants through complex requirements. Specializes in international regulations and best practices.",
    icon: MessageCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    avatar: "👩‍💼", // Placeholder - replace with actual image
    skills: [
      "Document Review",
      "Regulatory Guidance",
      "Multi-language Support",
    ],
    rating: 4.9,
    consultations: "25K+",
    languages: ["English", "French", "Spanish", "Mandarin"],
  },
  {
    id: "ella",
    name: "Ella",
    title: "AI interviewer",
    specialty: "Candidate Evaluation & Interviews",
    description:
      "Ella conducts comprehensive candidate assessments, validates credentials, and performs AI-powered interviews. Expert in competency evaluation and skills verification.",
    icon: UserCheck,
    color: "text-green-500",
    bgColor: "bg-green-50",
    avatar: "👩‍🔬", // Placeholder - replace with actual image
    skills: [
      "Credential Validation",
      "Skills Assessment",
      "Interview Analysis",
    ],
    rating: 4.8,
    consultations: "18K+",
    languages: ["English", "French", "Hindi", "Arabic"],
  },
  {
    id: "david",
    name: "David",
    title: "AI processor",
    specialty: "Application Processing & Matching",
    description:
      "David handles application submissions, opportunity matching, and processing workflows. Specializes in complex requirement checking and automated decision making.",
    icon: FileCheck,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    avatar: "👨‍💻", // Placeholder - replace with actual image
    skills: [
      "Application Processing",
      "Opportunity Matching",
      "Requirement Analysis",
    ],
    rating: 4.9,
    consultations: "50K+",
    languages: ["English", "French", "Portuguese", "Tagalog"],
  },
  {
    id: "underwriter",
    name: "Alex",
    title: "AI Underwriter",
    specialty: "Financial Assessment & Risk Analysis",
    description:
      "Alex provides automated underwriting, credit assessment, and financial risk analysis. Expert in loan processing and regulatory compliance for financial services.",
    icon: CreditCard,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    avatar: "👨‍💼", // Placeholder - replace with actual image
    skills: ["Credit Analysis", "Risk Assessment", "Compliance Checking"],
    rating: 4.7,
    consultations: "15K+",
    languages: ["English", "French", "German", "Italian"],
  },
  {
    id: "support",
    name: "Sam",
    title: "AI Support",
    specialty: "End-to-End Process Support",
    description:
      "Sam provides comprehensive support throughout the entire process, helping with questions, troubleshooting, and ensuring smooth workflows from start to finish.",
    icon: HeadphonesIcon,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    avatar: "👨‍💬", // Placeholder - replace with actual image
    skills: ["Process Support", "Troubleshooting", "Workflow Optimization"],
    rating: 4.8,
    consultations: "30K+",
    languages: ["English", "French", "Russian", "Japanese"],
  },
];

export const AgentsShowcase = () => {
  const handleHireAgent = (agentName: string) => {
    // TODO: Implement agent hiring/chat functionality
    console.log(`Hire ${agentName} clicked`);
  };

  return (
    <section id="agents" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Meet Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              AI Agents
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our specialized AI agents work as your dedicated team, each bringing
            unique expertise to guide you through every step of your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {agents.map((agent) => {
            const IconComponent = agent.icon;

            return (
              <Card
                key={agent.id}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden"
              >
                <CardHeader className="text-center space-y-6 pb-4">
                  {/* Agent Avatar */}
                  <div className="relative mx-auto">
                    <div className="w-24 h-24 mx-auto text-6xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border-4 border-background shadow-lg">
                      {agent.avatar}
                    </div>
                    <div
                      className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full ${agent.bgColor} flex items-center justify-center border-2 border-background`}
                    >
                      <IconComponent className={`w-4 h-4 ${agent.color}`} />
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {agent.name}
                    </h3>
                    <p className="text-primary font-medium">{agent.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {agent.specialty}
                    </p>
                  </div>

                  {/* Rating & Stats */}
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{agent.rating}</span>
                    </div>
                    <div className="text-muted-foreground">•</div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{agent.consultations}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Skills */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm">
                      Core Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm">
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.languages.map((language, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hire Button */}
                  <Button
                    onClick={() => handleHireAgent(agent.name)}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    variant="outline"
                  >
                    Hire {agent.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16 space-y-6">
          <div className="bg-muted/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Why Choose Our AI Agents?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <div className="font-semibold text-foreground">
                  24/7 Availability
                </div>
                <div className="text-muted-foreground">
                  Always ready to help, no appointments needed
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-foreground">
                  Expert Knowledge
                </div>
                <div className="text-muted-foreground">
                  Trained on latest regulations and best practices
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-foreground">
                  Multilingual Support
                </div>
                <div className="text-muted-foreground">
                  Communicate in your preferred language
                </div>
              </div>
            </div>
          </div>

          <Button size="lg" onClick={() => handleHireAgent("Jackie")}>
            Start with Jackie - Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};
