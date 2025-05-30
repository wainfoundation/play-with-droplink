
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast"
import { signUpWithEmail } from "@/services/authService";
import GoToTop from '@/components/GoToTop';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

const SignupPage = () => {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    try {
      const { user, session, error } = await signUpWithEmail(data.email, data.password);
      
      if (error) {
        throw new Error(error.message || 'Signup failed');
      }
      
      toast({
        title: "Signup successful!",
        description: "You have successfully signed up.",
      })
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: error.message,
      })
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Droplink</title>
        <meta name="description" content="Sign up for a new Droplink account and start sharing your links with the world." />
      </Helmet>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-7 text-white lg:flex">
          <div className="absolute inset-0 bg-muted/20" />
          <div className="relative z-20 mt-auto">
            <small className="font-semibold">
              Create Your Own World.{" "}
              <Link to="/demo" className="underline underline-offset-2">
                Learn More
              </Link>
            </small>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                Ready to get started?
              </h1>
              <p className="text-lg">
                Join the community of creators and share your world with
                everyone.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold">Create an account</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to create an account
              </p>
            </div>
            <Card className="border-0">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
                <CardDescription className="text-center">
                  Enter your email below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email?.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password?.message}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={handleSubmit(onSubmit)}>Sign Up</Button>
              </CardFooter>
            </Card>
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline" disabled>
                Google
              </Button>
              <Button variant="outline" disabled>
                Github
              </Button>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-2 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-2 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <GoToTop />
    </>
  );
};

export default SignupPage;
