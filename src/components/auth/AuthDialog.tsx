import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

interface AuthDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultTab?: "login" | "signup";
}

export function AuthDialog({
  isOpen = false,
  onClose = () => {},
  defaultTab = "login",
}: AuthDialogProps) {
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to FitEvents</DialogTitle>
        </DialogHeader>
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as "login" | "signup")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-4">
            <LoginForm onSuccess={onClose} />
          </TabsContent>
          <TabsContent value="signup" className="mt-4">
            <SignUpForm onSuccess={onClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
