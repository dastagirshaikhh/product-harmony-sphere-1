// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, ExternalLink } from 'lucide-react';
// import { supabase } from '@/lib/supabase';
// import { toast } from 'sonner';

// const Index = () => {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   useEffect(() => {
//     // Check if user is authenticated
//     const checkAuth = async () => {
//       try {
//         setIsLoading(true);
//         console.log('Checking authentication status...');
//         const { data, error } = await supabase.auth.getSession();
        
//         if (error) {
//           console.error('Auth check error:', error);
//           setError(error.message);
//           toast.error('Authentication check failed');
//           return;
//         }
        
//         console.log('Auth session data:', data);
//         setIsAuthenticated(!!data.session);
//       } catch (err) {
//         console.error('Unexpected error during auth check:', err);
//         setError('Failed to check authentication status');
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     checkAuth();
    
//     // Listen for auth changes
//     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//       console.log('Auth state changed:', event, !!session);
//       setIsAuthenticated(!!session);
//     });
    
//     return () => {
//       if (authListener?.subscription) {
//         authListener.subscription.unsubscribe();
//       }
//     };
//   }, []);
  
//   const handleNavigateToProducts = () => {
//     console.log('Navigating to products page...');
//     navigate('/products');
//   };

//   const handleNavigateToAuth = () => {
//     console.log('Navigating to auth page...');
//     navigate('/auth');
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#230d3a]">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-t-[#E0A4C4] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-[#E0A4C4]">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4 bg-[#230d3a]">
//         <div className="max-w-md w-full bg-black/30 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-red-500/20">
//           <h2 className="text-xl font-bold text-red-400 mb-4 text-center">Error Loading Page</h2>
//           <p className="text-white/80 mb-6 text-center">{error}</p>
//           <Button 
//             onClick={() => window.location.reload()} 
//             variant="destructive"
//             className="w-full"
//           >
//             Reload Page
//           </Button>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="h-screen fixed inset-0 overflow-hidden">
//       <style>
//         {`
//           @keyframes slideInFromLeft {
//             from {
//               opacity: 0;
//               transform: translateX(-20px);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }
//         `}
//       </style>
//       {/* Banner Container - removed additional height that causes scrolling */}
//       <div className="w-full h-full relative">
//         {/* Gradient Background */}
//         <div 
//           className="w-full h-full"
//           style={{
//             background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 50%, #2196f3 100%)',
//             position: 'relative'
//           }}
//         >
//           {/* Diagonal Divide */}
//           <div 
//             className="absolute top-0 right-0 w-1/2 h-full bg-[#1a0933]/80"
//             style={{
//               clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
//               transform: 'skewX(-15deg) translateX(10%)'
//             }}
//           ></div>
          
//           {/* Light Dots SVG - Replace with the security image */}
//           <div 
//             className="absolute right-0 top-0 w-1/2 h-full z-[1]"
//             style={{
//               backgroundImage: 'url("https://www.westconcomstor.com/content/dam/wcgcom/Global/CorpSite/main/Check-point-300766742-data-security.jpeg")',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center 80%',
//               opacity: '0.7',
//               mixBlendMode: 'lighten'
//             }}
//           ></div>
          
//           {/* Title Container */}
//           <div className="absolute top-1/2 left-[30px] transform -translate-y-1/2 z-[2] px-4 sm:px-6 lg:px-8 w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%]">
//             {/* Title with white background */}
//             <div className="inline-block" style={{ backgroundColor: 'white', padding: '4px 8px', marginBottom: '12px' }}>
//               <h1 
//                 style={{
//                   backgroundImage: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 50%, #2196f3 100%)',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   fontFamily: "'Montserrat', sans-serif",
//                   fontSize: "clamp(40px, 6vw, 75.89px)",
//                   fontWeight: "bold",
//                   lineHeight: 1,
//                   margin: 0,
//                   padding: 0,
//                   display: 'block',
//                   whiteSpace: 'nowrap'
//                 }}
//               >
//                 Broadcom
//               </h1>
//             </div>
            
//             <div className="block w-full"></div>
            
//             {/* Product Portfolio with white background */}
//             <div className="inline-block" style={{ backgroundColor: 'white', padding: '4px 8px', marginBottom: '12px' }}>
//               <h2 
//                 style={{
//                   backgroundImage: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 50%, #2196f3 100%)',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   fontFamily: "'Montserrat', sans-serif",
//                   fontSize: "clamp(40px, 6vw, 75.89px)",
//                   fontWeight: "bold",
//                   lineHeight: 1,
//                   margin: 0,
//                   padding: 0,
//                   display: 'block',
//                   whiteSpace: 'nowrap'
//                 }}
//               >
//                 Product Portfolio
//               </h2>
//             </div>
            
//             <div className="block w-full"></div>
            
//             {/* New Subtitle - flowing across the gradient slash */}
//             <div className="mt-4 sm:mt-6" style={{ 
//                 position: "relative",
//                 maxWidth: "100%",
//                 marginLeft: "0px",
//                 width: "100%"
//               }}>
//               <h3 
//                 className="text-white"
//                 style={{
//                   fontFamily: "'Montserrat', sans-serif",
//                   fontSize: "clamp(16px, 2vw, 19px)",
//                   fontWeight: 400,
//                   lineHeight: 1.5,
//                   textShadow: '0 1px 2px rgba(0,0,0,0.3)',
//                   textAlign: 'left',
//                   paddingLeft: "5px",
//                   width: "100%",
//                   fontStyle: 'italic'
//                 }}
//               >
//                 Empowering Businesses with Cutting-Edge Technology and Seamless Connectivity <br />Solutions for a Smarter Future
//               </h3>
              
//               {/* Button positioned below the subtitle */}
//               <div className="mt-6 sm:mt-8">
//                 <Button 
//                   size="lg"
//                   onClick={handleNavigateToProducts}
//                   className="bg-[#673ab7] hover:bg-[#5e35b1] text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-lg transition-all duration-300 transform hover:translate-x-2 hover:shadow-xl w-full sm:w-auto"
//                   style={{
//                     borderRadius: '0px',
//                     animation: 'slideInFromLeft 0.5s ease-out'
//                   }}
//                 >
//                   View Products
//                   <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;



// "use client"

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { ArrowRight, ChevronRight } from "lucide-react"
// import { supabase } from "@/lib/supabase"
// import { toast } from "sonner"

// const Index = () => {
//   const navigate = useNavigate()
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     // Check if user is authenticated
//     const checkAuth = async () => {
//       try {
//         setIsLoading(true)
//         console.log("Checking authentication status...")
//         const { data, error } = await supabase.auth.getSession()

//         if (error) {
//           console.error("Auth check error:", error)
//           setError(error.message)
//           toast.error("Authentication check failed")
//           return
//         }

//         console.log("Auth session data:", data)
//         setIsAuthenticated(!!data.session)
//       } catch (err) {
//         console.error("Unexpected error during auth check:", err)
//         setError("Failed to check authentication status")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     checkAuth()

//     // Listen for auth changes
//     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//       console.log("Auth state changed:", event, !!session)
//       setIsAuthenticated(!!session)
//     })

//     return () => {
//       if (authListener?.subscription) {
//         authListener.subscription.unsubscribe()
//       }
//     }
//   }, [])

//   const handleNavigateToProducts = () => {
//     console.log("Navigating to products page...")
//     navigate("/products")
//   }

//   const handleNavigateToAuth = () => {
//     console.log("Navigating to auth page...")
//     navigate("/auth")
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#230d3a] to-[#0d1a3a]">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-t-[#673ab7] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-white font-medium tracking-wide">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#230d3a] to-[#0d1a3a]">
//         <div className="max-w-md w-full bg-black/30 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-red-500/20">
//           <h2 className="text-xl font-bold text-red-400 mb-4 text-center">Error Loading Page</h2>
//           <p className="text-white/80 mb-6 text-center">{error}</p>
//           <Button onClick={() => window.location.reload()} variant="destructive" className="w-full font-medium">
//             Reload Page
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="h-screen fixed inset-0 overflow-hidden">
//       <style jsx>{`
//         @keyframes slideInFromLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
        
//         @keyframes gradientShift {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }
        
//         .animate-slide-in {
//           animation: slideInFromLeft 0.8s ease-out forwards;
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 1.2s ease-out forwards;
//         }
        
//         .gradient-text {
//           background: linear-gradient(135deg, #9c27b0 0%, #673ab7 50%, #2196f3 100%);
//           -webkit-background-clip: text;
//           background-clip: text;
//           color: transparent;
//         }
        
//         .gradient-bg {
//           background: linear-gradient(135deg, #9c27b0 0%, #673ab7 50%, #2196f3 100%);
//           background-size: 200% 200%;
//           animation: gradientShift 15s ease infinite;
//         }
        
//         .diagonal-divide {
//           clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
//         }
        
//         .button-hover:hover {
//           box-shadow: 0 10px 25px -5px rgba(103, 58, 183, 0.5);
//           transform: translateY(-2px);
//         }
//       `}</style>

//       {/* Main Container */}
//       <div className="w-full h-full relative">
//         {/* Gradient Background */}
//         <div className="w-full h-full gradient-bg relative">
//           {/* Diagonal Divide */}
//           <div className="absolute top-0 right-0 w-3/5 h-full bg-[#1a0933]/90 diagonal-divide"></div>

//           {/* Floating Elements - Add visual interest */}
//           <div className="absolute w-full h-full overflow-hidden pointer-events-none">
//             <div className="absolute top-[15%] left-[10%] w-24 h-24 rounded-full bg-[#9c27b0]/10 animate-pulse"></div>
//             <div
//               className="absolute top-[60%] left-[20%] w-16 h-16 rounded-full bg-[#2196f3]/10 animate-pulse"
//               style={{ animationDelay: "1s" }}
//             ></div>
//             <div
//               className="absolute top-[30%] right-[40%] w-20 h-20 rounded-full bg-[#673ab7]/10 animate-pulse"
//               style={{ animationDelay: "0.5s" }}
//             ></div>
//           </div>

//           {/* Security Image with Overlay */}
//           <div className="absolute right-0 top-0 w-3/5 h-full z-[1] diagonal-divide">
//             <div className="absolute inset-0 bg-gradient-to-br from-[#1a0933]/70 to-[#1a0933]/95"></div>
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage:
//                   'url("https://www.westconcomstor.com/content/dam/wcgcom/Global/CorpSite/main/Check-point-300766742-data-security.jpeg")',
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 opacity: "0.4",
//                 mixBlendMode: "luminosity",
//               }}
//             ></div>

//             {/* Tech Pattern Overlay */}
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage:
//                   'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%239C92AC" fillOpacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
//                 opacity: "0.15",
//               }}
//             ></div>
//           </div>

//           {/* Content Container */}
//           <div className="absolute inset-0 flex items-center z-10">
//             <div className="container mx-auto px-6 lg:px-12">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//                 {/* Left Content */}
//                 <div className="flex flex-col justify-center space-y-8">
//                   {/* Logo */}
//                   <div className="animate-slide-in opacity-0" style={{ animationDelay: "0.1s" }}>
//                     <div className="inline-block bg-white px-4 py-2 shadow-lg">
//                       <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text tracking-tight">
//                         Broadcom
//                       </h1>
//                     </div>
//                   </div>

//                   {/* Product Portfolio */}
//                   <div className="animate-slide-in opacity-0" style={{ animationDelay: "0.3s" }}>
//                     <div className="inline-block bg-white px-4 py-2 shadow-lg">
//                       <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text tracking-tight">
//                         Product Portfolio
//                       </h2>
//                     </div>
//                   </div>

//                   {/* Subtitle */}
//                   <div className="animate-slide-in opacity-0" style={{ animationDelay: "0.5s" }}>
//                     <h3 className="text-white text-lg md:text-xl font-light leading-relaxed tracking-wide max-w-xl">
//                       <span className="font-medium">Empowering Businesses</span> with Cutting-Edge Technology and
//                       Seamless Connectivity Solutions for a Smarter Future
//                     </h3>
//                   </div>

//                   {/* Buttons */}
//                   <div
//                     className="flex flex-col sm:flex-row gap-4 animate-slide-in opacity-0"
//                     style={{ animationDelay: "0.7s" }}
//                   >
//                     <Button
//                       size="lg"
//                       onClick={handleNavigateToProducts}
//                       className="bg-[#673ab7] hover:bg-[#5e35b1] text-white px-8 py-6 text-lg font-medium shadow-lg transition-all duration-300 button-hover rounded-none"
//                     >
//                       View Products
//                       <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
//                     </Button>

//                     {!isAuthenticated && (
//                       <Button
//                         size="lg"
//                         onClick={handleNavigateToAuth}
//                         variant="outline"
//                         className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium transition-all duration-300 rounded-none"
//                       >
//                         Sign In
//                         <ArrowRight className="ml-2 h-5 w-5" />
//                       </Button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Content - Enterprise Features */}
//                 <div className="hidden lg:flex flex-col justify-center animate-fade-in opacity-0">
//                   <div className="bg-white/10 backdrop-blur-md p-6 border border-white/20 shadow-xl">
//                     <h3 className="text-white text-2xl font-medium mb-6">Enterprise Solutions</h3>
//                     <ul className="space-y-4">
//                       {[
//                         "Advanced Security Infrastructure",
//                         "Cloud Integration & Management",
//                         "Network Optimization",
//                         "AI-Powered Analytics",
//                         "Seamless Connectivity",
//                       ].map((feature, index) => (
//                         <li key={index} className="flex items-center text-white/90">
//                           <div className="w-2 h-2 bg-[#9c27b0] mr-3"></div>
//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Index


"use client"

import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, Globe, Shield, Cpu, Zap, BarChart3 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { motion } from "framer-motion"

const Index = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e
        const { width, height } = heroRef.current.getBoundingClientRect()
        const x = clientX / width - 0.5
        const y = clientY / height - 0.5
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        console.log("Checking authentication status...")
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth check error:", error)
          setError(error.message)
          toast.error("Authentication check failed")
          return
        }

        console.log("Auth session data:", data)
        setIsAuthenticated(!!data.session)
      } catch (err) {
        console.error("Unexpected error during auth check:", err)
        setError("Failed to check authentication status")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, !!session)
      setIsAuthenticated(!!session)
    })

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe()
      }
    }
  }, [])

  const handleNavigateToProducts = () => {
    console.log("Navigating to products page...")
    navigate("/products")
  }

  const handleNavigateToAuth = () => {
    console.log("Navigating to auth page...")
    navigate("/auth")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#230d3a] to-[#0d1a3a]">
        <div className="text-center">
          <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#673ab7"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset="0"
            >
              <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="2s" repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          <p className="mt-6 text-white font-medium tracking-wide text-xl">Initializing...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#230d3a] to-[#0d1a3a]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-black/30 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-red-500/20"
        >
          <h2 className="text-xl font-bold text-red-400 mb-4 text-center">Error Loading Page</h2>
          <p className="text-white/80 mb-6 text-center">{error}</p>
          <Button onClick={() => window.location.reload()} variant="destructive" className="w-full font-medium">
            Reload Page
          </Button>
        </motion.div>
      </div>
    )
  }

  // Feature cards data
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Advanced Security",
      description: "Enterprise-grade protection for your critical infrastructure",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Connectivity",
      description: "Seamless integration across worldwide networks",
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "AI Processing",
      description: "Next-generation computing power for complex operations",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Suite",
      description: "Real-time insights and predictive business intelligence",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Accelerated Performance",
      description: "Optimized systems for maximum efficiency",
    },
  ]

  return (
    <div className="h-screen fixed inset-0 overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#230d3a] to-[#0d1a3a] opacity-80"></div>
        {/* Light Dots SVG - Replace with the security image */}
        <div
          className="absolute right-0 top-0 w-1/2 h-full z-[1] diagonal-background"
          style={{
            backgroundImage:
              'url("https://www.westconcomstor.com/content/dam/wcgcom/Global/CorpSite/main/Check-point-300766742-data-security.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center 80%",
            opacity: "0.7",
            mixBlendMode: "lighten",
          }}
        ></div>

        {/* Animated Particles */}
        {/* <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 blur-xl"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translate(-50%, -50%)`,
                animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div> */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full" ref={heroRef}>
        {/* Animated Styles */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translate(-50%, -50%); }
            50% { transform: translate(-50%, -60%); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .gradient-text {
            background: linear-gradient(90deg, #9c27b0, #673ab7, #2196f3, #9c27b0);
            background-size: 300% 100%;
            animation: gradientFlow 8s ease infinite;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          
          .gradient-border {
            position: relative;
            border: 2px solid transparent;
            background-clip: padding-box;
          }
          
          .gradient-border::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: -2px;
            border-radius: inherit;
            background: linear-gradient(90deg, #9c27b0, #673ab7, #2196f3, #9c27b0);
            background-size: 300% 100%;
            animation: gradientFlow 8s ease infinite;
            z-index: -1;
          }
          
          .feature-card {
            transition: all 0.3s ease;
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px -10px rgba(103, 58, 183, 0.3);
          }
          
          .feature-card:hover .feature-icon {
            transform: scale(1.1);
          }
          
          .parallax-layer {
            will-change: transform;
            transition: transform 0.1s ease-out;
          }

          .animated-background {
            width: 110%;
            height: 110%;
            position: relative;
            overflow: hidden;
            margin: -5%;
          }

          .animated-background img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            animation: slowPan 40s infinite alternate ease-in-out;
          }

          @keyframes slowPan {
            0% {
              transform: scale(1.05) translate(-1%, -1%);
            }
            50% {
              transform: scale(1.1) translate(1%, 1%);
            }
            100% {
              transform: scale(1.05) translate(0%, -2%);
            }
          }

          .diagonal-background {
            animation: slowZoom 60s infinite alternate ease-in-out;
          }

          @keyframes slowZoom {
            0% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1.15);
            }
          }
        `}</style>

        {/* Header with Glass Effect */}
        <header className="absolute top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center"
              >
                <div className="bg-white/90 px-3 py-1 rounded-sm">
                  <span className="text-2xl font-bold gradient-text">Broadcom</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden md:flex items-center space-x-6"
              >
                {["Solutions", "Products", "Services", "Support", "About"].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    {item}
                  </a>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {!isAuthenticated ? (
                  <Button
                    onClick={handleNavigateToAuth}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold">B</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content - Main Heading */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="parallax-layer"
                  style={{
                    transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                  }}
                >
                  <div className="inline-block bg-white p-4 shadow-[0_0_30px_rgba(156,39,176,0.3)] rounded-sm">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold gradient-text tracking-tight leading-none">
                      Broadcom
                    </h1>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="parallax-layer"
                  style={{
                    transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
                  }}
                >
                  <div className="inline-block bg-white p-4 shadow-[0_0_30px_rgba(156,39,176,0.3)] rounded-sm">
                    <h2 className="text-5xl md:text-6xl font-bold gradient-text tracking-tight leading-none">
                      Product Portfolio
                    </h2>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="parallax-layer"
                  style={{
                    transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
                  }}
                >
                  <p className="text-white text-xl md:text-2xl font-light leading-relaxed max-w-xl">
                    <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      Empowering Businesses
                    </span>{" "}
                    with Cutting-Edge Technology and Seamless Connectivity Solutions for a Smarter Future
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 parallax-layer"
                  style={{
                    transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
                  }}
                >
                  <Button
                    size="lg"
                    onClick={handleNavigateToProducts}
                    className="bg-gradient-to-r from-[#9c27b0] to-[#673ab7] hover:from-[#8e24aa] hover:to-[#5e35b1] text-white px-8 py-7 text-lg font-medium shadow-[0_10px_25px_-5px_rgba(156,39,176,0.5)] transition-all duration-300 rounded-sm group overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center">
                      View Products
                      <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Button>

                  {!isAuthenticated && (
                    <Button
                      size="lg"
                      onClick={handleNavigateToAuth}
                      variant="outline"
                      className="gradient-border bg-transparent text-white hover:bg-white/10 px-8 py-7 text-lg font-medium transition-all duration-300 rounded-sm"
                    >
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                </motion.div>
              </div>

              {/* Right Content - 3D Visual & Features */}
              <div className="relative">
                {/* 3D Visual Element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute -top-20 -right-20 w-80 h-80 opacity-40 parallax-layer"
                  style={{
                    transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px) rotate(${mousePosition.x * 10}deg)`,
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
                </motion.div>

                {/* Security Image with Advanced Effects */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative z-10 overflow-hidden rounded-lg shadow-[0_20px_80px_-10px_rgba(103,58,183,0.5)] parallax-layer"
                  style={{
                    transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9c27b0]/40 to-[#2196f3]/40 mix-blend-overlay"></div>
                  <div className="animated-background">
                    <img
                      src="https://www.westconcomstor.com/content/dam/wcgcom/Global/CorpSite/main/Check-point-300766742-data-security.jpeg"
                      alt="Advanced Security Technology"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-bold mb-2">Enterprise Security</h3>
                    <p className="text-white/80">Next-generation protection for mission-critical systems</p>
                  </div>
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-8 grid grid-cols-2 gap-4 parallax-layer"
                  style={{
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                  }}
                >
                  {features.slice(0, 4).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="feature-card bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/10"
                    >
                      <div className="feature-icon text-purple-400 mb-3 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-white text-lg font-medium mb-1">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Tech Elements */}
        <div className="absolute bottom-8 left-8 z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center space-x-4"
          >
            {["AI", "5G", "Cloud", "IoT", "Security"].map((tech, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {tech}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Animated Glow Effect */}
        {/* <div
          className="absolute pointer-events-none w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
          style={{
            left: `calc(${mousePosition.x * 100 + 50}%)`,
            top: `calc(${mousePosition.y * 100 + 50}%)`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.3s ease-out, top 0.3s ease-out",
          }}
        ></div> */}
      </div>
    </div>
  )
}

export default Index

