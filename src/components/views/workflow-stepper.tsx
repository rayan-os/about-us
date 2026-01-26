import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  FileCheck,
  MessageCircle,
  UserCheck,
} from "lucide-react";

const workflowSteps = [
  {
    id: "jackie",
    name: "Jackie",
    title: "Counseling",
    description: "Initial consultation and document guidance",
    icon: MessageCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    id: "ella",
    name: "Ella",
    title: "Assessment",
    description: "Candidate evaluation and interview",
    icon: UserCheck,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    id: "david",
    name: "David",
    title: "Processing",
    description: "Application submission and opportunity matching",
    icon: FileCheck,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    id: "underwriter",
    name: "Underwriter",
    title: "Financial",
    description: "Credit assessment and loan processing",
    icon: CreditCard,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    id: "outcome",
    name: "Success",
    title: "Outcome",
    description: "Approved application and next steps",
    icon: CheckCircle,
    color: "text-emerald-500",
    bgColor: "bg-emerald-100",
  },
];

export const WorkflowStepper = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            How Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              AI Workflow
            </span>{" "}
            Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our intelligent agents work together seamlessly to guide applicants
            from initial consultation to successful outcomes.
          </p>
        </div>

        {/* Mobile Workflow - Vertical Stack */}
        <div className="md:hidden space-y-8">
          {workflowSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <IconComponent className={`w-6 h-6 ${step.color}`} />
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="w-0.5 h-16 bg-border mt-4" />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-lg text-foreground">
                    {step.name}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Workflow - Horizontal Flow */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2 z-0" />

            <div className="relative z-10 grid grid-cols-5 gap-4">
              {workflowSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Step Circle */}
                    <div
                      className={`w-20 h-20 rounded-full ${step.bgColor} flex items-center justify-center mb-4 shadow-lg border-4 border-background`}
                    >
                      <IconComponent className={`w-10 h-10 ${step.color}`} />
                    </div>

                    {/* Step Info */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-foreground">
                        {step.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground max-w-32 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow (except for last item) */}
                    {index < workflowSteps.length - 1 && (
                      <ArrowRight className="absolute top-10 -right-6 w-6 h-6 text-muted-foreground transform -translate-y-1/2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Example Workflows */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Example Workflows
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Student Workflow */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                </div>
                <h4 className="font-semibold text-foreground">
                  International Student
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Jackie counsels on program options → Ella assesses academic
                background → David submits applications → Success: Study permit
                approved
              </p>
              <div className="text-xs text-primary font-medium">
                ~45 days average processing
              </div>
            </div>

            {/* Nurse Workflow */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-green-500" />
                </div>
                <h4 className="font-semibold text-foreground">
                  Healthcare Professional
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Jackie explains licensing requirements → Ella validates
                credentials → David connects with employers → Success: Job
                placement secured
              </p>
              <div className="text-xs text-primary font-medium">
                ~60 days average processing
              </div>
            </div>

            {/* Bank Workflow */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-purple-500" />
                </div>
                <h4 className="font-semibold text-foreground">
                  Loan Processing
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Document collection → Fraud detection → Credit assessment →
                Underwriter review → Success: Loan approved
              </p>
              <div className="text-xs text-primary font-medium">
                ~7 days average processing
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
