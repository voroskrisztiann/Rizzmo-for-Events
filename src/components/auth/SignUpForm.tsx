import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";

interface SignUpFormProps {
  onSuccess?: () => void;
}

export function SignUpForm({ onSuccess = () => {} }: SignUpFormProps) {
  const { signUp } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("participant");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      setError("You must accept the terms and conditions");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const session = await signUp(
        email,
        password,
        role,
        firstName,
        lastName,
        phone,
        birthYear,
        gender,
        acceptTerms,
        acceptMarketing,
        staySignedIn,
      );

      // Close the dialog even if we're waiting for email confirmation
      if (!session) {
        setError(
          "Please check your email to confirm your account before signing in.",
        );
        onSuccess(); // Close the modal even if email confirmation is needed
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        onSuccess(); // Close the modal on successful login
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex gap-2">
          <Select defaultValue="+421">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Prefix" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+421">+421</SelectItem>
            </SelectContent>
          </Select>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="birthYear">Birth Year (Optional)</Label>
          <Input
            id="birthYear"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender (Optional)</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Male</SelectItem>
              <SelectItem value="1">Female</SelectItem>
              <SelectItem value="2">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>I want to</Label>
        <RadioGroup
          defaultValue={role}
          onValueChange={setRole}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="participant" id="participant" />
            <Label htmlFor="participant">Join Events</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="trainer" id="trainer" />
            <Label htmlFor="trainer">Host Events</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={setAcceptTerms}
          />
          <Label htmlFor="terms" className="text-sm">
            I accept the terms and conditions and privacy policy
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="marketing"
            checked={acceptMarketing}
            onCheckedChange={setAcceptMarketing}
          />
          <Label htmlFor="marketing" className="text-sm">
            I want to receive marketing communications
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="staySignedIn"
            checked={staySignedIn}
            onCheckedChange={setStaySignedIn}
          />
          <Label htmlFor="staySignedIn" className="text-sm">
            Stay signed in
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading || !acceptTerms}
      >
        {loading ? "Loading..." : "Register"}
      </Button>
    </form>
  );
}
