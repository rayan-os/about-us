"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  FileText,
  Globe,
  GraduationCap,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    id: "students",
    title: "International Students",
    description: "Complete pathway from application to graduation in Canada",
    icon: GraduationCap,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    href: "/solutions/students",
    examples: [
      {
        title: "Program Matching",
        description: "AI-powered matching to find the perfect academic program",
        icon: FileText,
      },
      {
        title: "Study Permits",
        description: "Streamlined visa and permit application processing",
        icon: CheckCircle,
      },
      {
        title: "Pathway Support",
        description: "End-to-end guidance from enrollment to graduation",
        icon: Globe,
      },
    ],
    stats: {
      processed: "50K+",
      label: "Students Placed",
    },
  },
  {
    id: "nurses",
    title: "Healthcare Professionals",
    description:
      "Professional licensing and job placement for international nurses",
    icon: Stethoscope,
    color: "text-green-500",
    bgColor: "bg-green-50",
    href: "/solutions/nurses",
    examples: [
      {
        title: "License Assessment",
        description: "Automated evaluation of international credentials",
        icon: FileText,
      },
      {
        title: "Skills Verification",
        description: "AI-driven competency testing and validation",
        icon: CheckCircle,
      },
      {
        title: "Job Placement",
        description: "Direct connection to healthcare employers",
        icon: Globe,
      },
    ],
    stats: {
      processed: "12K+",
      label: "Nurses Placed",
    },
  },
  {
    id: "banks",
    title: "Financial Services",
    description: "Automated underwriting and document processing for banks",
    icon: Building2,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    href: "/solutions/banks",
    examples: [
      {
        title: "Document OCR",
        description: "Advanced extraction and fraud detection",
        icon: FileText,
      },
      {
        title: "Risk Assessment",
        description: "AI-powered underwriting and decision making",
        icon: CheckCircle,
      },
      {
        title: "Compliance",
        description: "Automated regulatory compliance checking",
        icon: Globe,
      },
    ],
    stats: {
      processed: "100K+",
      label: "Applications Processed",
    },
  },
];

export const SolutionsSection = () => {
  const handleCustomSolutionClick = () => {
    // TODO: Implement custom solution discussion
    console.log("Discuss custom solution clicked");
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Solutions for Every{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Journey
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From international students to healthcare professionals, our AI
            agents create personalized workflows that turn applications into
            opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {solutions.map((solution) => {
            const IconComponent = solution.icon;

            return (
              <Card
                key={solution.id}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden"
              >
                <CardHeader className="text-center space-y-4">
                  <div
                    className={`mx-auto w-16 h-16 rounded-full ${solution.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`w-8 h-8 ${solution.color}`} />
                  </div>

                  <div>
                    <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
                      {solution.title}
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">
                      {solution.description}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Examples */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                      Key Features
                    </h4>
                    <div className="space-y-3">
                      {solution.examples.map((example, index) => {
                        const ExampleIcon = example.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center mt-0.5">
                              <ExampleIcon className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-foreground text-sm">
                                {example.title}
                              </h5>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {example.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {solution.stats.processed}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {solution.stats.label}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href={solution.href}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Explore Solution
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Need a custom solution? Our AI agents can be configured for any
            workflow.
          </p>
          <Button
            size="lg"
            onClick={handleCustomSolutionClick}
            className="bg-primary hover:bg-primary/90"
          >
            Discuss Custom Solution
          </Button>
        </div>
      </div>
    </section>
  );
};
