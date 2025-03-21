import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText, Users, Layers, Link } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

// Form schema for new/edit product
const productSchema = z.object({
  name: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  shortDescription: z.string().min(10, { message: "Short description must be at least 10 characters." }),
  fullDescription: z.string(),
  category: z.string().min(1, { message: "Please select a category." }),
  subscriptionType: z.string().optional(),
  isActive: z.boolean().default(true),
  whitepaperLinks: z.array(
    z.object({
      title: z.string(),
      url: z.string().url({ message: "Please enter a valid URL." })
    })
  ).optional().default([]),
});

// Sample categories data - will be replaced by API call
const sampleCategories = [
  { id: '1', name: 'Networking' },
  { id: '2', name: 'Cloud Services' },
  { id: '3', name: 'Security' },
];

// Define the product type explicitly
interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  useCases: string[];
  competition: string[];
  subscriptionType: string;
  whitepaperLinks: { title: string; url: string; }[];
  category: string;
  isActive: boolean;
}

// This will be replaced by actual API call once backend is implemented
const fetchProductDetails = async (id: string) => {
  console.log("Fetching product details for:", id);

  // For new products, return empty template
  if (id === 'new') {
    return {
      id: 'new',
      name: '',
      shortDescription: '',
      fullDescription: '',
      features: [],
      competition: [],
      useCases: [],
      subscriptionType: '',
      whitepaperLinks: [],
      category: '',
      isActive: true
    };
  }

  // Simulate API call delay for existing products
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock data - will be replaced by actual API call
  switch (id) {
    // Carbon Black Products
    case '7': // Carbon Black App Control
      return {
        id: '7',
        name: 'Carbon Black App Control',
        shortDescription: 'Trusted software enforcement with flexible deployment',
        fullDescription: 'Carbon Black App Control leverages a positive security model allowing only trusted software to run. It can be deployed on-premise, on private and public clouds.',
        features: [
          "Carbon Black App Control leverages a positive security model allowing only trusted software to run",
          "It can be deployed on-premise, on private and public clouds.",
          "Trusted software enforcement"
        ],
        useCases: [
          "Reduce unplanned downtime of critical systems",
          "Reduce costly re-imaging",
          "Consolidate agents",
          "Prevent unwanted changes to system configs",
          "Protect legacy systems",
          "Manage software licenses accurately",
          "File inventory",
          "Application Vulnerability assessment",
          "Regulatory"
        ],
        competition: [
          'Ivanti',
          'Airlock Digital',
          'Tripwire'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Forrester Report', url: 'https://tei.forrester.com/go/carbonblack/appcontrol/?lang=en-us' },
          { title: 'Technical Documentation', url: 'https://techdocs.broadcom.com/us/en/carbon-black/app-control.html' },
          { title: 'Developer Documentation', url: 'https://developer.carbonblack.com/reference/enterprise-protection/' },
          { title: 'Technical Overview', url: 'https://docs.broadcom.com/docs/carbon-black-app-control-technical-overview' }
        ],
        category: 'Carbon Black',
        isActive: true
      };

    case '8': // Carbon Black EDR
      return {
        id: '8',
        name: 'Carbon Black EDR',
        shortDescription: 'Advanced threat detection and response',
        fullDescription: 'Carbon Black EDR detects and responds to advanced attacks through a comprehensive and integrated approach for security teams. Carbon Black provides immediate access to the most complete picture of an attack, reducing lengthy investigations from days to minutes. Security teams can proactively hunt for threats, uncover suspicious behavior, disrupt active attacks, and address gaps in defenses before attackers can. Carbon Black EDR gives a proactive and unified defense against evolving threats.',
        features: [
          "Carbon Black EDR detects and responds to advanced attacks through a comprehensive and integrated approach for security teams.",
          "Carbon Black provides immediate access to the most complete picture of an attack, reducing lengthy investigations from days to minutes.",
          "Security teams can proactively hunt for threats, uncover suspicious behavior, disrupt active attacks, and address gaps in defenses before attackers can.",
          "Carbon Black EDR gives a proactive and unified defense against evolving threats."
        ],
        useCases: [
          "Advanced Threat Detection",
          "Incident Response",
          "Threat Hunting",
          "Malware Analysis",
          "Compliance & Reporting",
          "Insider Threat Detection",
          "Data Exfiltration Detection",
          "Operational Efficiency",
          "Third-Party Risk Management",
          "Ransomware Detection",
          "Enhanced Visibility & Control"
        ],
        competition: [
          'Palo Alto',
          'Crowdstrike',
          'Sentinel One'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://techdocs.broadcom.com/us/en/carbon-black/edr.html' }
        ],
        category: 'Carbon Black',
        isActive: true
      };

    case '9': // Carbon Black Endpoint Foundation
      return {
        id: '9',
        name: 'Carbon Black Endpoint Foundation',
        shortDescription: 'NGAV, Behavioral EDR, and Device Control',
        fullDescription: 'NGAV, Behavioral EDR, Device Control',
        features: [
          'NGAV',
          'Behavioral EDR',
          'Device Control'
        ],
        useCases: [
          "Ransomware Defense",
          "Operational Efficiency",
          "Malware Analysis",
          "Real-Time Monitoring",
          "Data Exfiltration Prevention",
          "Remote shell into endpoints for immediate action",
          "Cloud-native platform with single agent & console"
        ],
        competition: [
          'Palo Alto',
          'Crowdstrike',
          'Sentinel One'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://techdocs.broadcom.com/us/en/carbon-black/cloud.html' },
          { title: 'Developer Documentation', url: 'https://developer.carbonblack.com/reference/carbon-black-cloud' },
          { title: 'Downloads', url: 'https://www.broadcom.com/support/download-search?pg=Carbon+Black&pf=Carbon+Black&pn=&pa=&po=&dk=&pl=&l=false' },
          { title: 'Forrester Report', url: 'https://tei.forrester.com/go/carbonblack/cloud/index.html?lang=en-us' }
        ],
        category: 'Carbon Black',
        isActive: true
      };

    case '10': // Carbon Black Endpoint Advanced
      return {
        id: '10',
        name: 'Carbon Black Endpoint Advanced',
        shortDescription: 'Live Query, Vulnerability Management, NGAV, Behavioral EDR, and Device Control',
        fullDescription: 'Live Query, Vulnerability Management, NGAV, Behavioral EDR, Device Control',
        features: [
          "Live Query",
          "Vulnerability Management",
          "NGAV",
          "Behavioral EDR",
          "Device Control"
        ],
        useCases: [
          "Ransomware Defense",
          "Operational Efficiency",
          "Malware Analysis",
          "Real-Time Monitoring",
          "Data Exfiltration Prevention",
          "Remote shell into endpoints for immediate action",
          "Cloud-native platform with single agent & console",
          "Pull 1,500+ artifacts across all endpoints",
          "Flexible query scheduler",
          "Filterable & exportable results",
          "Built-in vulnerability context and links to resources",
          "Prioritized and scored based on risk of exploit"
        ],
        competition: [
          'Palo Alto',
          'Crowdstrike',
          'Sentinel One'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://techdocs.broadcom.com/us/en/carbon-black/cloud.html' },
          { title: 'Developer Documentation', url: 'https://developer.carbonblack.com/reference/carbon-black-cloud' },
          { title: 'Downloads', url: 'https://www.broadcom.com/support/download-search?pg=Carbon+Black&pf=Carbon+Black&pn=&pa=&po=&dk=&pl=&l=false' },
          { title: 'Forrester Report', url: 'https://tei.forrester.com/go/carbonblack/cloud/index.html?lang=en-us' }
        ],
        category: 'Carbon Black',
        isActive: true
      };

    case '11': // Carbon Black Endpoint Enterprise
      return {
        id: '11',
        name: 'Carbon Black Endpoint Enterprise',
        shortDescription: 'Live Query, Vulnerability Management, NGAV, Behavioral EDR, Device Control, and Enterprise EDR',
        fullDescription: 'Live Query, Vulnerability Management, NGAV, Behavioral EDR, Device Control, Enterprise EDR',
        features: [
          'Live Query',
          'Vulnerability Management',
          'NGAV',
          'Behavioral EDR',
          'Device Control',
          'Enterprise EDR'
        ],
        useCases: [
          "Ransomware Defense",
          "Operational Efficiency",
          "Malware Analysis",
          "Real-Time Monitoring",
          "Data Exfiltration Prevention",
          "Remote shell into endpoints for immediate action",
          "Cloud-native platform with single agent & console",
          "Pull 1,500+ artifacts across all endpoints",
          "Flexible query scheduler",
          "Filterable & exportable results",
          "Built-in vulnerability context and links to resources",
          "Prioritized and scored based on risk of exploit",
          "Continuous and centralized recording of endpoint activity",
          "Out-of-the-box and customizable threat intelligence",
          "Identity intelligence",
          "Attack chain visualization and enterprise-wide search"
        ],
        competition: [
          'Palo Alto',
          'Crowdstrike',
          'Sentinel One'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://techdocs.broadcom.com/us/en/carbon-black/cloud.html' },
          { title: 'Developer Documentation', url: 'https://developer.carbonblack.com/reference/carbon-black-cloud' },
          { title: 'Downloads', url: 'https://www.broadcom.com/support/download-search?pg=Carbon+Black&pf=Carbon+Black&pn=&pa=&po=&dk=&pl=&l=false' },
          { title: 'Forrester Report', url: 'https://tei.forrester.com/go/carbonblack/cloud/index.html?lang=en-us' }
        ],
        category: 'Carbon Black',
        isActive: true
      };

    case '12': // Carbon Black Workload Enterprise
      return {
        id: '12',
        name: 'Carbon Black Workload Enterprise',
        shortDescription: 'Enterprise EDR, NGAV, Behavioral EDR, Asset Inventory, Live Query, CIS Benchmarks, vCenter Plug-in, Lifecycle Management, and Vulnerability Management',
        fullDescription: 'Enterprise EDR, NGAV, Behavioral EDR, Asset Inventory, Live Query, CIS Benchmarks, vCenter Plug-in, Lifecycle Management, Vulnerability Management',
        features: [
          "Enterprise EDR",
          "NGAV",
          "Behavioral EDR",
          "Asset Inventory",
          "Live Query",
          "CIS Benchmarks",
          "vCenter Plug-in",
          "Lifecycle Management",
          "Vulnerability Management"
        ],
        useCases: [
          "Public cloud support and account onboarding",
          "CIS Benchmarks",
          "Ransomware Defense",
          "Operational Efficiency",
          "Malware Analysis",
          "Real-Time Monitoring",
          "Data Exfiltration Prevention",
          "Remote shell into endpoints for immediate action",
          "Cloud-native platform with single agent & console",
          "Pull 1,500+ artifacts across all endpoints",
          "Flexible query scheduler",
          "Filterable & exportable results",
          "Built-in vulnerability context and links to resources",
          "Prioritized and scored based on risk of exploit",
          "Continuous and centralized recording of endpoint activity",
          "Out-of-the-box and customizable threat intelligence",
          "Identity intelligence",
          "Attack chain visualization and enterprise-wide search"
        ],
        competition: [
          'Palo Alto',
          'Crowdstrike',
          'Sentinel One'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://techdocs.broadcom.com/us/en/carbon-black/cloud.html' },
          { title: 'Developer Documentation', url: 'https://developer.carbonblack.com/reference/carbon-black-cloud' },
          { title: 'Downloads', url: 'https://www.broadcom.com/support/download-search?pg=Carbon+Black&pf=Carbon+Black&pn=&pa=&po=&dk=&pl=&l=false' },
          { title: 'Forrester Report', url: 'https://tei.forrester.com/go/carbonblack/cloud/index.html?lang=en-us' }
        ],
        category: 'Carbon Black',
        isActive: true
      };

    case '13': // Carbon Black eNDR/XDR
      return {
        id: '13',
        name: 'Carbon Black eNDR/XDR',
        shortDescription: 'eNDR/XDR',
        fullDescription: 'eNDR/XDR',
        features: [
          'eNDR/XDR'
        ],
        useCases: [
          'Enterprise EDR',
          'Network Visibility',
          'Identity Intelligence'
        ],
        competition: [
          'Palo Alto',
          'Crowdstrike',
          'Sentinel One'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://techdocs.broadcom.com/us/en/carbon-black/cloud.html' },
          { title: 'Developer Documentation', url: 'https://developer.carbonblack.com/reference/carbon-black-cloud' },
          { title: 'Downloads', url: 'https://www.broadcom.com/support/download-search?pg=Carbon+Black&pf=Carbon+Black&pn=&pa=&po=&dk=&pl=&l=false' },
          { title: 'Forrester Report', url: 'https://tei.forrester.com/go/carbonblack/cloud/index.html?lang=en-us' }
        ],
        category: 'Carbon Black',
        isActive: true
      };

    case '14': // Carbon Black Host Based Firewall
      return {
        id: '14',
        name: 'Carbon Black Host Based Firewall',
        shortDescription: 'Management console to monitor and control network connections from managed endpoints',
        fullDescription: 'Management console to monitor and control network connections from managed endpoints',
        features: [
          "Management console to monitor and control network connections from managed endpoints"
        ],
        useCases: [
          'Flexible rule-based enforcement',
          'Integrated into console policy workflows',
          'Increased visibility into network and application behavior',
          'Streamline enforcement by integrating with native OS firewall tools'
        ],
        competition: [
          'Palo Alto',
          'Crowdstrike',
          'Sentinel One'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://techdocs.broadcom.com/us/en/carbon-black/cloud.html' },
          { title: 'Developer Documentation', url: 'https://developer.carbonblack.com/reference/carbon-black-cloud' },
          { title: 'Downloads', url: 'https://www.broadcom.com/support/download-search?pg=Carbon+Black&pf=Carbon+Black&pn=&pa=&po=&dk=&pl=&l=false' },
          { title: 'Forrester Report', url: 'https://tei.forrester.com/go/carbonblack/cloud/index.html?lang=en-us' }
        ],
        category: 'Carbon Black',
        isActive: true
      };

    // Other products (Existing)
    case '30': // Endpoint DLP
      return {
        id: '30',
        name: 'Endpoint DLP (Endpoint Prevent and Endpoint Discover)',
        shortDescription: 'Identifies sensitive information on endpoints (desktops/laptops) and monitors/regulates the flow of that information.',
        fullDescription: 'Identifies sensitive information on endpoints (desktops/laptops) and monitors/regulates the flow of that information.',
        features: [
          "Symantec Endpoint DLP lets you identify sensitive information on endpoints (Desktops/Laptops) in your organization and enables you to monitor and regulate the flow of that information as it moves off devices and is accessed by applications."
        ],
        useCases: [
          "Prevent data leakage",
          "Monitor sensitive information",
          "Regulate data transfer",
          "Protect confidential files",
          "Identify stored confidential data",
          "Secure or relocate sensitive data",
          "Stop unauthorized file transfers",
          "Prevent data movement to external storage",
          "Monitor application-level data transfers",
          "Enable high-performance scanning for compliance"
        ],
        competition: [
          'Forcepoint',
          'Zscaler',
          'Trend Micro'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://techdocs.broadcom.com/us/en/symantec-security-software/information-security/data-loss-prevention/16-1/about-discovering-and-preventing-data-loss-on-endpoints.html' }
        ],
        category: 'DLP',
        isActive: true
      };

    case '31': // Network DLP
      return {
        id: '31',
        name: 'Network DLP (Network Monitor, Network Prevent for Email, Network Prevent for Web)',
        shortDescription: 'Captures and analyzes network traffic to detect confidential data and metadata over protocols like SMTP, FTP, HTTP, and IM.',
        fullDescription: 'Captures and analyzes network traffic to detect confidential data and metadata over protocols like SMTP, FTP, HTTP, and IM.',
        features: [
          "Network DLP captures and analyzes traffic on network, detecting confidential data, and traffic metadata over protocols you specify. These protocols include SMTP, FTP, HTTP, and various IM protocols"
        ],
        useCases: [
          "Network Monitor captures and analyzes traffic on your network, detecting confidential data, and traffic metadata over protocols you specify. These protocols include SMTP, FTP, HTTP, and various IM protocols. You can configure a Network Monitor Server to monitor custom protocols and to use various filters (per protocol) to filter out the low-risk traffic.",
          "Network Prevent for Email monitors and analyzes the outbound email traffic in-line. It also optionally blocks, redirects, or modifies email messages as specified in your policies. Network Prevent for Email integrates with industry-standard mail transfer agents (MTAs) and hosted email services to monitor and stop data loss incidents over SMTP. Policies that are deployed on the Network Prevent for Email Server direct the Prevent-integrated MTA or hosted mail server. The Prevent-integrated mail server blocks, reroutes, and alters email messages that are based on specific content or other message attributes.",
          "The Network Prevent for Web Server integrates with an HTTP, HTTPS, or FTP proxy server using ICAP for in-line active Web request management. If it detects confidential data in Web content, it causes the proxy to reject requests or remove HTML content as specified in your policies."
        ],
        competition: [
          'Forcepoint',
          'Zscaler',
          'Trend Micro'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Implementation Guide', url: 'https://techdocs.broadcom.com/us/en/symantec-security-software/information-security/data-loss-prevention/16-1/implementing-network-monitor.html' }
        ],
        category: 'DLP',
        isActive: true
      };

    case '32': // Storage DLP
      return {
        id: '32',
        name: 'Storage DLP (Endpoint Discover and Network Discover)',
        shortDescription: 'Locates exposed confidential data on network storage and endpoints.',
        fullDescription: 'Locates exposed confidential data on network storage and endpoints.',
        features: [
          "DLP is a set of technologies, products, and techniques that are designed to stop sensitive information from leaving an organization"
        ],
        useCases: [
          "Data loss prevention is a security solution that identifies and helps prevent unsafe or inappropriate sharing, transfer, or use of sensitive data.",
          "The Network Discover Server locates a wide range of exposed confidential data. It communicates with the Enforce Server to obtain information about policies and scan targets. It sends information about exposed confidential data that it finds to the Enforce Server for reporting and remediation.The Network Discover Server scans the selected targets, reads the files or repositories, and detects whether confidential information is present."
        ],
        competition: [
          'Forcepoint',
          'Zscaler'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Implementation Guide', url: 'https://techdocs.broadcom.com/us/en/symantec-security-software/information-security/data-loss-prevention/16-1/implementing-network-monitor.html' }
        ],
        category: 'DLP',
        isActive: true
      };

    case '33': // Cloud DLP (CASB DLP)
      return {
        id: '33',
        name: 'DLP Cloud (CASB DLP, Cloud Detection Service for Email, Cloud Detection Service for Web, OCR in the Cloud)',
        shortDescription: 'Provides data loss prevention for cloud applications (e.g., Office 365, G-Suite, Box, Salesforce).',
        fullDescription: 'Provides data loss prevention for cloud applications (e.g., Office 365, G-Suite, Box, Salesforce).',
        features: [
          "DLP helps you understand how your sensitive information is being used, including what data is being handled and by whom.",
          "DLP scans sanctioned and unsanctioned cloud apps, such as Office 365, G-Suite, Box, and Salesforce.",
          "Perform local scanning, detection, and real-time monitoring."
        ],
        useCases: [
          "Application Detection expands the Symantec best-in-class policy detection capabilities to include Symantec CloudSoc, proprietary cloud applications, and the Symantec API Detection Server.",
          "Symantec CloudSOC: The Symantec Cloud Detection Service lets you integrate seamlessly with the Symantec CloudSOC cloud access security broker (CASB). Symantec CloudSOC includes Securlets and Gatelets with robust APIs that connect to many software-as-a-service (SaaS) applications, such as Gmail, Google Drive, and Salesforce. Securlets inspect sensitive data that is exposed in cloud applications. Gatelets inspect content in files and documents as they are uploaded to, or downloaded from, cloud applications. Connecting Symantec Data Loss Prevention to Symantec CloudSOC through the Cloud Detection Service lets you incorporate the Symantec best-in-class policy detection capabilities for any SaaS application Symantec CloudSOC supports.",
          "Proprietary cloud applications: You can write REST clients for your own cloud applications using the Symantec Detection REST API, allowing you to inspect application data through the Symantec Cloud Detection Service.",
          "The API Detection Server: You can use API Detection to connect with on-premises applications. You must create a REST client for the applications you would like to connect."
        ],
        competition: [
          'Forcepoint',
          'Zscaler'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Cloud Services Guide', url: 'https://techdocs.broadcom.com/us/en/symantec-security-software/information-security/data-loss-prevention/16-1/using-cloud-services-to-prevent-data-loss.html' }
        ],
        category: 'DLP',
        isActive: true
      };

    case '34': // SEP-SES
      return {
        id: '34',
        name: 'SEP-SES',
        shortDescription: 'Comprehensive endpoint protection suite',
        fullDescription: 'Symantec Endpoint Security provides advanced protection against modern cyber threats.',
        category: 'Endpoint',
        isActive: true,
        products: [
          {
            name: "Adaptive Protection",
            short_description: "Protection against sophisticated attacks",
            description: "Adaptive Protection protects enterprise environments from the shift in the threat landscape toward sophisticated and targeted attacks.",
            features: [
              "Living off the Land (LOTL) attack prevention",
              "Customizable protection policies",
              "Advanced threat detection"
            ],
            use_cases: [
              "Protect against sophisticated attacks",
              "Customize protection policies",
              "Detect advanced threats"
            ],
            competition: [
              "Microsoft",
              "PaloAlto",
              "SentinelOne",
              "Trellix",
              "Crowdstrike",
              "Trend Micro"
            ],
            clients: [
              "HCL",
              "PNB",
              "Axis Bank",
              "Infosys"
            ],
            subscription_type: "Subscription",
            white_paper_links: [
              "https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-security/sescloud/Using-Adaptive-Protection.html"
            ]
          },
          {
            name: "AD Threat Defense",
            short_description: "Active Directory threat defense",
            description: "AD breach assessment and threat defense for Active Directory environments.",
            features: [
              "Active Directory breach assessment",
              "Threat detection",
              "Cloud and on-premise deployment"
            ],
            use_cases: [
              "Protect Active Directory",
              "Detect breaches",
              "Deploy on cloud or on-premise"
            ],
            competition: [
              "Microsoft",
              "PaloAlto",
              "SentinelOne",
              "Trellix",
              "Crowdstrike",
              "Trend Micro"
            ],
            clients: [
              "Axis Bank (In Progress)"
            ],
            subscription_type: "Subscription",
            white_paper_links: [
              "https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-security/sescloud/Using-Threat-Defense-for-Active-Directory.html"
            ]
          },
          {
            name: "Host Integrity",
            short_description: "Endpoint compliance and integrity checks",
            description: "SEP Host Integrity provides flexible compliance checks and options to automate remediation.",
            features: [
              "Compliance checks",
              "Automated remediation",
              "Scalable policy updates"
            ],
            use_cases: [
              "Ensure endpoint compliance",
              "Automate remediation",
              "Scalable policy management"
            ],
            competition: [
              "Microsoft",
              "PaloAlto",
              "SentinelOne",
              "Trellix",
              "Crowdstrike",
              "Trend Micro"
            ],
            clients: [
              "Infosys",
              "HCL",
              "ICICI",
              "HDFC",
              "Axis Bank",
              "Vodafone",
              "PNB",
              "SBI Life",
              "Canara Bank"
            ],
            subscription_type: "Subscription",
            white_paper_links: [
              "https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-security/sescloud/Settings/cs-help-hi-console-v14067393-d4155e15268.html"
            ]
          }
        ]
      };

    case '48': // SPE-NAS
      return {
        id: '48',
        name: 'SPE - NAS',
        shortDescription: 'Network-attached storage protection',
        fullDescription: 'Provides defense-in-depth protection of storage and protects sensitive data stored in centralized repositories from hackers and infection.',
        category: 'Endpoint',
        isActive: true,
        products: [
          {
            name: "Clean Pipe Security",
            short_description: "Scan Before, During, and After Storage",
            description: "Provides defense-in-depth protection of storage. Protects sensitive data stored in centralized repositories from hackers and infection. Protects unmanaged clients accessing storage.",
            features: [
              "Provides defense-in-depth protection of storage Protects sensitive data stored in centralized repositories from hackers and infection Protects unmanaged clients accessing storage",
            ],
            use_cases: [
              "Clean Pipe Security (Scan Before, During, and After Storage)",
            ],
            competition: [
              "Trend Micro"
            ],
            clients: [
              "Axis Bank",
              "HDFC",
              "Infosys"
            ],
            subscription_type: "Subscription",
            white_paper_links: [
              "https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/symantec-protection-engine/9-2-0/Related-Documents.html"
            ]
          },
          {
            name: "File Uploads/Download Protection from Malware",
            short_description: "Secure file storage operations",
            description: "Protect users in an enterprise that may download or upload files to storage.",
            features: [
              "Protect users in an enterprise that may download or uploaded to File Storage ",
            ],
            use_cases: [
              "File Uploads/Download Protetcion from Malware"
            ],
            competition: [
              "Trend Micro"
            ],
            clients: [
              "Axis Bank",
              "HDFC",
              "Infosys"
            ],
            subscription_type: "Subscription",
            white_paper_links: [
              "https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/symantec-protection-engine/9-2-0/Related-Documents.html"
            ]
          },
          {
            name: "Unprotected Storage & Archived Data",
            short_description: "Protect business-critical stored data",
            description: "Protects important business data and tools/utilities residing on storage devices that need malware protection.",
            features: [
              "Protect Important business data and tools/utilities residing on storage devices that need malware protection."
            ],
            use_cases: [
              "Unprotected Storage & Archived Data"
            ],
            competition: [
              "Trend Micro"
            ],
            clients: [
              "Axis Bank",
              "HDFC",
              "Infosys"
            ],
            subscription_type: "Subscription",
            white_paper_links: [
              "https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/symantec-protection-engine/9-2-0/Related-Documents.html"
            ]
          },
          {
            name: "Symantec Protection Engine for NAS: Integrations",
            short_description: "ICAP-supported storage security",
            description: "Devices with built-in ICAP support for F5, EMC, Hitachi, IBM, Ctera, NetApp Storage Defined Interface over RPC (7G, C-Mode).",
            features: [
              "Devices with built-in ICAP Support fo - F5, EMC, Hitachi, IBM, Ctera etc  / Netapp Stoarge Defined Interface over RPC (7G, C-Mode)"
            ],
            use_cases: [
              "Symantec Protection Engine for NAS: Integrations"
            ],
            competition: [
              "Trend Micro"
            ],
            clients: [
              "Axis Bank",
              "HDFC",
              "Infosys"
            ],
            subscription_type: "Subscription",
            white_paper_links: [
              "https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/symantec-protection-engine/9-2-0/Related-Documents.html"
            ]
          }
        ]
      };

    case '49': // SPE-CS
      return {
        id: '49',
        name: 'SPE - CS',
        shortDescription: 'Cloud storage protection',
        fullDescription: 'Protects important business data and tools/utilities residing on storage devices that need malware protection.',
        features: [
          "Protect Important business data and tools/utilities residing on storage devices that need malware protection.",
          "Protect File Storage & Archiving, File Uploads/Downloads",
          "Prevent users from accidentally  infecting the cloud-based storage services.",
          "Prevent users from downloading malware onto their devices from cloud storage, applications etc",
          "Supports ICAP  - Forward/Reverse Proxy, Firewalls – Squid, F5, etc.",
          "ICAP, C, Java, .Net",
          "On-prem, AWS, Azure, Google Cloud",
          "VMWare ESXi, AWS, Azure, Google Cloud"
        ],
        useCases: [
          "Unprotected Cloud Storage & Archived Data",
          "File Uploads/Download Protetcion from Malware",
          "Clean Pipe Security ( Scan Before, During, and After Storage )",
          "Reduce Exposure in Cloud-based Services",
          "Prevent Infected File Downloads from Cloud Services",
          "Out of box integration with Apps/devices",
          "Ease of custom integrations",
          "Deployment Model",
          "Certified on"
        ],
        competition: [
          'AWS',
          'ClamAV',
          'Trend Micro'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/symantec-protection-engine/9-2-0/Related-Documents.html' }
        ],
        category: 'Endpoint',
        isActive: true
      };

    case '50': // DCS
      return {
        id: '50',
        name: 'DCS',
        shortDescription: 'Data center security',
        fullDescription: 'Provides IDS, system hardening, logon/logoff monitoring, configuration monitoring, and least privilege access control.',
        features: [
          "IDS",
          "System hardening",
          "Logons/Logoffs Monitoring",
          "Configuration monitoring",
          "Least privilege access control."
        ],
        useCases: [
          "HIPS, HIDS, System Hardening, Vulnerability Mitigation, Real time FIM etc"
        ],
        competition: [
          'Trend Micro',
          'Trellix'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/data-center-security-(dcs)/6-9-3.html' }
        ],
        category: 'Endpoint',
        isActive: true
      };

    case '60': // DX NetOps
      return {
        id: '60',
        name: 'DX NetOps',
        shortDescription: 'Provides network management, including events, fault management, performance monitoring, flow analysis, and configuration management.',
        fullDescription: 'Provides network management, including events, fault management, performance monitoring, flow analysis, and configuration management.',
        features: [
          "Network Management"
        ],
        useCases: [
          "Network Events & Fault Management",
          "Network Performance Monitoring",
          "Network Flow Analysis",
          "Network Configuration Management"
        ],
        competition: [
          'Solarwinds',
          'HP NNM',
          'Manage Engine'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/netops-product-brief' }
        ],
        category: 'AOD',
        isActive: true
      };

    case '61': // AppNeta
      return {
        id: '61',
        name: 'AppNeta',
        shortDescription: 'Provides synthetic network monitoring and digital experience monitoring.',
        fullDescription: 'Provides synthetic network monitoring and digital experience monitoring.',
        features: [
          "Digital Experience Monitoring"
        ],
        useCases: [
          "Hop by Hop Network path analysis"
        ],
        competition: [
          'Cisco 1000E'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/appneta-sb' }
        ],
        category: 'AOD',
        isActive: true
      };

    case '62': // Clarity
      return {
        id: '62',
        name: 'Clarity',
        shortDescription: 'Provides project portfolio management (PPM) for centralized planning, resource optimization, and reporting.',
        fullDescription: 'Provides project portfolio management (PPM) for centralized planning, resource optimization, and reporting.',
        features: [
          "project portfolio management (PPM)"
        ],
        useCases: [
          "Centralized Planning and Prioritization",
          "Resource Optimization",
          "Reporting and Insights"
        ],
        competition: [
          'Planview',
          'ServiceNow',
          'Microsoft Project'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/clarity-ppm-product-brief' }
        ],
        category: 'AOD',
        isActive: true
      };

    case '63': // Rally
      return {
        id: '63',
        name: 'Rally',
        shortDescription: 'Provides agile project management and software development lifecycle (SDLC) management.',
        fullDescription: 'Provides agile project management and software development lifecycle (SDLC) management.',
        features: [
          "Agile project management and software development lifecycle (SDLC) management"
        ],
        useCases: [
          "Agile Development",
          "Release Planning & Management",
          "Defect Management & Quality Assurance"
        ],
        competition: [
          'Jira'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/docs/rally-software-product-brief' }
        ],
        category: 'AOD',
        isActive: true
      };

    case '64': // Automic Automation
      return {
        id: '64',
        name: 'Automic Automation',
        shortDescription: 'Manages complex workloads across platforms, ERPs, and business apps spanning on-premises, hybrid, and multi-cloud environments.',
        fullDescription: 'Manages complex workloads across platforms, ERPs, and business apps spanning on-premises, hybrid, and multi-cloud environments.',
        features: [
          "Job Scheduling and Automation",
          "Workflow Automation",
          "IT Service Management (ITSM) Integration",
          "Cloud Automation",
          "API Integration",
          "Custom Scripting"
        ],
        useCases: [
          "BMC Control-M",
          "Stonebranch UAC"
        ],
        competition: [
          'BMC Control-M',
          'Stonebranch UAC'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://docs.broadcom.com/doc/12398023' }
        ],
        category: 'AOD',
        isActive: true
      };

    case '65': // Autosys Workload Automation
      return {
        id: '65',
        name: 'Autosys Workload Automation',
        shortDescription: 'Provides batch processing and data integration for automated data transfers, nightly reports, and data backup.',
        fullDescription: 'Provides batch processing and data integration for automated data transfers, nightly reports, and data backup.',
        features: [
          "Batch processing",
          "Data integration",
          "Automated data transfers"
        ],
        useCases: [
          "Automate data transfers",
          "Generate nightly reports",
          "Backup and recover data"
        ],
        competition: [
          'BMC Control-M',
          'IBM Workload Scheduler'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://docs.broadcom.com/doc/ca-workload-automation-ae' }
        ],
        category: 'AOD',
        isActive: true
      };

    case '66': // IMS
      return {
        id: '66',
        name: 'IMS',
        shortDescription: 'Information Management System',
        fullDescription: 'Mainframe-based hierarchical database and information management system.',
        features: [
          'Hierarchical database',
          'Transaction management',
          'Information management'
        ],
        useCases: [
          'Database management',
          'Transaction processing',
          'Information organization'
        ],
        competition: [
          'Oracle',
          'IBM Db2'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://docs.broadcom.com/doc/ims-product-brief' }
        ],
        category: 'IMS',
        isActive: true
      };

    case '67': // IMS Tools
      return {
        id: '67',
        name: 'IMS Tools',
        shortDescription: 'Database management tools',
        fullDescription: 'Comprehensive suite of tools for managing and maintaining IMS databases.',
        features: [
          'Database management',
          'System maintenance',
          'Performance optimization'
        ],
        useCases: [
          'Manage databases',
          'Maintain systems',
          'Optimize performance'
        ],
        competition: [
          'BMC',
          'IBM'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://docs.broadcom.com/doc/ims-tools-brief' }
        ],
        category: 'IMS',
        isActive: true
      };

    case '68': // IMS Database
      return {
        id: '68',
        name: 'IMS Database',
        shortDescription: 'High-performance database',
        fullDescription: 'High-performance hierarchical database for mission-critical applications.',
        features: [
          'High performance',
          'Data integrity',
          'Scalability'
        ],
        useCases: [
          'Mission-critical applications',
          'High-volume transactions',
          'Data management'
        ],
        competition: [
          'Oracle',
          'IBM Db2'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://docs.broadcom.com/doc/ims-db-brief' }
        ],
        category: 'IMS',
        isActive: true
      };

    case '69': // IMS Transaction Manager
      return {
        id: '69',
        name: 'IMS Transaction Manager',
        shortDescription: 'Transaction processing system',
        fullDescription: 'High-performance transaction processing system for mission-critical applications.',
        features: [
          'Transaction processing',
          'High availability',
          'System reliability'
        ],
        useCases: [
          'Process transactions',
          'Ensure high availability',
          'Maintain system reliability'
        ],
        competition: [
          'IBM CICS',
          'Oracle Tuxedo'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://docs.broadcom.com/doc/ims-tm-brief' }
        ],
        category: 'IMS',
        isActive: true
      };

    case '70': // CA Service Desk
      return {
        id: '70',
        name: 'CA Service Desk',
        shortDescription: 'A comprehensive ITSM tool for incident management, problem management, change management, and service catalog management.',
        fullDescription: 'A comprehensive ITSM tool for incident management, problem management, change management, and service catalog management.',
        features: [
          "Incident Management: Helps IT teams quickly respond to and resolve service interruptions. The tool tracks incidents, assigns priorities, and ensures timely resolution to minimize downtime.",
          "Problem Management: Enables the identification and resolution of underlying issues causing incidents, aiming to prevent future occurrences.",
          "Change Management: Supports the planning, approval, and implementation of changes to IT infrastructure and services while minimizing risks to operations.",
          "Configuration Management: Helps manage and maintain the configuration items (CIs) in the IT environment, providing a clear overview of dependencies and relationships between systems.",
          "Service Catalog: A central repository of available IT services that users can request. This feature makes it easier for end-users to access and request standard services.",
          "Knowledge Management: Facilitates the creation and sharing of knowledge articles to help users solve problems independently and enhance operational efficiency.",
          "Self-Service Portal: Provides a user-friendly interface for employees or customers to submit service requests, view status updates, and access knowledge base articles.",
          "Automated Workflow and Incident Resolution: Automates workflows and processes to reduce manual intervention and improve efficiency in handling tickets and service requests.",
          "Reports & Analytics: Offers in-depth reporting and data analysis to help track service performance, understand trends, and make data-driven decisions for continuous improvement.",
          "Multi-Channel Support: Supports requests and incident reporting through various channels like email, web portal, and phone, improving accessibility and communication."
        ],
        useCases: [
          "Enterprise IT Operations: Organizations use CA Service Desk to improve the efficiency of their IT operations, ensuring that service interruptions are minimized, and customer satisfaction is maximized.",
          "Customer Support: The solution can be leveraged by customer support teams to track, manage, and resolve customer issues across various channels, ensuring faster resolution times and better service delivery.",
          "Cloud Service Management: Cloud-based service providers may use CA Service Desk to handle incidents, requests, and other service management tasks efficiently, ensuring seamless service delivery.",
          "ITIL Framework Implementation: Many businesses use CA Service Desk to align their IT service management practices with the ITIL (Information Technology Infrastructure Library) framework for best practices in managing IT services.",
          "Compliance and Audit Management: For companies requiring strict compliance with regulations, CA Service Desk helps track and report service management metrics, ensuring accountability and transparency."
        ],
        competition: [
          'ServiceNow',
          'Freshservice',
          'Zendesk'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://docs.broadcom.com/doc/ca-service-desk-manager' }
        ],
        category: 'ITSM',
        isActive: true
      };

    case '77': // ITSM
      return {
        id: '77',
        name: 'CA Service Management',
        shortDescription: 'IT Service Management solutions',
        fullDescription: 'Comprehensive IT service management solution that helps organizations streamline service delivery, improve efficiency, and enhance user experience.',
        features: [
          'Service desk management',
          'Asset management',
          'Change management',
          'Knowledge management',
          'Self-service portal',
          'SLA management'
        ],
        useCases: [
          'IT service delivery optimization',
          'Asset lifecycle management',
          'Service catalog management',
          'Incident and problem resolution',
          'Change and release management'
        ],
        competition: [
          'ServiceNow',
          'BMC Helix',
          'Ivanti',
          'Cherwell'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Technical Documentation', url: 'https://docs.broadcom.com/doc/ca-service-management' },
          { title: 'Solution Brief', url: 'https://docs.broadcom.com/doc/ca-service-management-solution-brief' }
        ],
        category: 'ITSM',
        isActive: true
      };

    // Proxy Products
    case '80': // CloudSOC CASB
      return {
        id: '80',
        name: 'CloudSOC CASB',
        shortDescription: 'Protects against data leaks from endpoints by identifying unsanctioned Shadow IT and risky applications.',
        fullDescription: 'Protects against data leaks from endpoints by identifying unsanctioned Shadow IT and risky applications.',
        features: [
          "Protects data leak from end point"
        ],
        useCases: [
          "Helps you determine which apps should be blocked and which should be allowed within your organization by identifying unsanctioned Shadow IT and risky applications and users."
        ],
        competition: [
          'Forcepoint',
          'Zscaler',
          'Trend Micro'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/symantec-network-protection-product-brief' }
        ],
        category: 'Proxy',
        isActive: true
      };

    case '81': // Network Protection Suite (On-Premise)
      return {
        id: '81',
        name: 'Network Protection Suite (On-Premise)',
        shortDescription: 'Provides safe internet browsing and SSL/TLS interception over the internet.',
        fullDescription: 'Provides safe internet browsing and SSL/TLS interception over the internet.',
        features: [
          "Safe Internet Browsing and SSL / TLS interception over the internet"
        ],
        useCases: [
          "A single product with multiple implementations; on-premises, cloud, or hybrid. It includes multiple features and components used to protect networks, clients, and servers from today's malicious traffic while allowing safe interaction with all available applications from any location. Web Protection is a single solution offering productive internet connectivity for users at corporate sites, small branch offices and from remote locations including your home. Web Protection delivers a complete secure solution that includes centralized management, reporting, threat intelligence, SSL inspection, isolation, and CASB visibility and control.",
        ],
        competition: [
          'Zscaler',
          'Netskope',
          'Forcepoint'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/symantec-network-protection-product-brief' }
        ],
        category: 'Proxy',
        isActive: true
      };

    case '82': // Reverse Proxy
      return {
        id: '82',
        name: 'Reverse Proxy (Network Protection Suite)',
        shortDescription: 'Protects internally hosted web servers by securing and accelerating web applications and websites.',
        fullDescription: 'Protects internally hosted web servers by securing and accelerating web applications and websites.',
        features: [
          "Protecting Internally Hosted Web Servers",
        ],
        useCases: [
          "File-based malware detection and Machine Learning with the Content Analysis licensing for Edge SWG and Cloud SWG.",
        ],
        competition: [
          'Zscaler',
          'Netskope',
          'Forcepoint'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/symantec-network-protection-product-brief' }
        ],
        category: 'Proxy',
        isActive: true
      };

    case '83': // Proxy on Cloud - SaaS
      return {
        id: '83',
        name: 'Proxy on Cloud - SaaS (Network Protection Suite)',
        shortDescription: 'Provides safe internet browsing and SSL/TLS interception over the internet in a cloud-based solution.',
        fullDescription: 'Provides safe internet browsing and SSL/TLS interception over the internet in a cloud-based solution.',
        features: [
          "Safe Internet Browsing and SSL / TLS interception over the internet",
        ],
        useCases: [
          "Execution of all web sessions away from endpoints, sending only a safe rendering of information to users’ browsers. This prevents any website-delivered, zero-day malware from reaching user devices. Administrators can set policies to isolate websites that are uncategorized or categorized at Risk Level 5 and above. The full Web Isolation feature allows administrators to define what is matched to qualify the traffic for isolation and then determine how isolation takes effect, such as allow, scan or block files and can set sites as read-only for added protection.",
        ],
        competition: [
          'Zscaler',
          'Netskope',
          'Forcepoint'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/symantec-network-protection-product-brief' }
        ],
        category: 'Proxy',
        isActive: true
      };

    case '84': // Cloud Firewall Service - SaaS
      return {
        id: '84',
        name: 'Cloud Firewall Service - SaaS (Network Protection Suite)',
        shortDescription: 'Provides granular control over non-HTTP/HTTPS protocols with firewall policies in the cloud.',
        fullDescription: 'Provides granular control over non-HTTP/HTTPS protocols with firewall policies in the cloud.',
        features: [
          "Granular Control Over non HTTP/HTTPS protocol"
        ],
        useCases: [
          "File-based malware detection, Machine Learning, and cloud-based sandboxing and remote file detonation is included with the Content Analysis licensing for Cloud SWG."
        ],
        competition: [
          'Zscaler',
          'Netskope'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/symantec-network-protection-product-brief' }
        ],
        category: 'Proxy',
        isActive: true
      };

    case '85': // Deep File Inspection - Content Analysis (On-Premise)
      return {
        id: '85',
        name: 'Deep File Inspection - Content Analysis (On-Premise)',
        shortDescription: 'Provides content analysis to protect against threats from malicious URLs and downloads.',
        fullDescription: 'Provides content analysis to protect against threats from malicious URLs and downloads.',
        features: [
          "Content analysis to protect from Threats from Malacious URLs and Malacious Downloads"
        ],
        useCases: [
          "File-based malware detection and Machine Learning with the Content Analysis licensing for Edge SWG and Cloud SWG."
        ],
        competition: [
          'Zscaler',
          'Netskope',
          'Forcepoint'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/symantec-network-protection-product-brief' }
        ],
        category: 'Proxy',
        isActive: true
      };

    case '86': // Deep File Inspection - Content Analysis (Cloud/SaaS)
      return {
        id: '86',
        name: 'Deep File Inspection - Content Analysis (Cloud/SaaS)',
        shortDescription: 'Provides content analysis to protect against threats from malicious URLs and downloads in a cloud-based solution.',
        fullDescription: 'Provides content analysis to protect against threats from malicious URLs and downloads in a cloud-based solution.',
        features: [
          "Content analysis to protect from Threats from Malacious URLs and Malacious Downloads",
        ],
        useCases: [
          "File-based malware detection and Machine Learning with the Content Analysis licensing for Edge SWG and Cloud SWG.",
        ],
        competition: [
          'Zscaler',
          'Netskope',
          'Forcepoint'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/symantec-network-protection-product-brief' }
        ],
        category: 'Proxy',
        isActive: true
      };

    case '87': // High Risk or Full Web Isolation
      return {
        id: '87',
        name: 'High Risk or Full Web Isolation (Network Protection Suite)',
        shortDescription: 'Protects against harmful and unknown web URL categories by executing web sessions away from endpoints.',
        fullDescription: 'Protects against harmful and unknown web URL categories by executing web sessions away from endpoints.',
        features: [
          "Protection from harmful and unknown Web URL categories"
        ],
        useCases: [
          "Execution of all web sessions away from endpoints, sending only a safe rendering of information to users’ browsers. This prevents any website-delivered, zero-day malware from reaching user devices. Administrators can set policies to isolate websites that are uncategorized or categorized at Risk Level 5 and above. The full Web Isolation feature allows administrators to define what is matched to qualify the traffic for isolation and then determine how isolation takes effect, such as allow, scan or block files and can set sites as read-only for added protection."
        ],
        competition: [
          'Zscaler',
          'Netskope',
          'Forcepoint'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/symantec-network-protection-product-brief' }
        ],
        category: 'Proxy',
        isActive: true
      };

    case '88': // Malware Analysis - Only on SaaS
      return {
        id: '88',
        name: 'Malware Analysis - Only on SaaS (Network Protection Suite)',
        shortDescription: 'Provides sandboxing for unknown threats in a cloud-based solution.',
        fullDescription: 'Provides sandboxing for unknown threats in a cloud-based solution.',
        features: [
          "Sandboxing for unknown threats",
        ],
        useCases: [
          "File-based malware detection, Machine Learning, and cloud-based sandboxing and remote file detonation is included with the Content Analysis licensing for Cloud SWG.",
        ],
        competition: [
          'Zscaler',
          'Netskope',
          'Forcepoint'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/symantec-network-protection-product-brief' }
        ],
        category: 'Proxy',
        isActive: true
      };

    case '89': // ZTNA
      return {
        id: '89',
        name: 'ZTNA (Network Protection Suite)',
        shortDescription: 'Provides secure private access to resources hosted on-premise and SaaS.',
        fullDescription: 'Provides secure private access to resources hosted on-premise and SaaS.',
        features: [
          "Secure Private access to resources hosted on Premise as well as SaaS"
        ],
        useCases: [
          "ZTNA eliminates inbound connections to customer networks (and the need for a VPN) and creates a software-defined perimeter (SDP) between users and applications. Only authorized users can connect to specific applications while making applications invisible to attackers."
        ],
        competition: [
          'Zscaler',
          'Netskope'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://docs.broadcom.com/doc/symantec-network-protection-product-brief' }
        ],
        category: 'Proxy',
        isActive: true
      };

    case '90': // SSLV
      return {
        id: '90',
        name: 'SSLV (SSL Visibility Appliance)',
        shortDescription: 'Provides SSL/TLS decryption for visibility into encrypted traffic.',
        fullDescription: 'Provides SSL/TLS decryption for visibility into encrypted traffic.',
        features: [
          "SSL/TLS decryption"
        ],
        useCases: [
          'The SSL Visibility Appliance is an integral component to any organization’s traffic management strategy, providing visibility into encrypted traffic that ensures attacks cannot slip by undetected. The appliance identifies and decrypts all SSL connections and applications across all network ports, and even irregular ports. The decrypted feeds can be used by the existing security infrastructure to strengthen their ability to detect and protect against advanced threats; by offloading process intensive decryption'
        ],
        competition: [
          'Gigamon'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [
          { title: 'Data Sheet', url: 'https://docs.broadcom.com/doc/SSL-Visibility-DS' }
        ],
        category: 'Proxy',
        isActive: true
      };

    // IMS (Identity Management Solutions) Products
    case '100': // Security Analytics
      return {
        id: '100',
        name: 'Security Analytics',
        shortDescription: 'Improves network visibility, inspection, and forensics to accelerate incident response and remediation.',
        fullDescription: 'Improves network visibility, inspection, and forensics to accelerate incident response and remediation.',
        features: [
          'Threat Hunting'
        ],
        useCases: [
          "Security Analytics improves network visibility, inspection, and forensics to accelerate incident response and remediation."
        ],
        competition: [
          'Qradar',
          'Vehere',
          'ExtraHop'
        ],
        subscriptionType: 'Hardware and Subscription',
        whitepaperLinks: [
          { title: 'Product Brief', url: 'https://www.broadcom.com/products/cybersecurity/network/forensics-security-analytics' }
        ],
        category: 'IMS',
        isActive: true
      };

    case '101': // SMG / ESS (Email Security)
      return {
        id: '101',
        name: 'SMG / ESS (Email Security)',
        shortDescription: 'Provides email protection and antispam capabilities.',
        fullDescription: 'Provides email protection and antispam capabilities.',
        features: [
          'Antispam'
        ],
        useCases: [
          "Email protection"
        ],
        competition: [
          'Proofpoint',
          'Barracuda',
          'Trend Micro',
          'Trellix'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [],
        category: 'IMS',
        isActive: true
      };

    case '102': // PGP Endpoint
      return {
        id: '102',
        name: 'PGP Endpoint',
        shortDescription: 'Provides drive encryption and whole disk encryption for data protection.',
        fullDescription: 'Provides drive encryption and whole disk encryption for data protection.',
        features: [
          "Drive Encryption Whole disk encryption"
        ],
        use_cases: [
          "Data protection"
        ],
        competition: [
          'Trellix',
          'ServiceNow'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [],
        category: 'IMS',
        isActive: true
      };

    case '103': // VIP (Multifactor Authentication)
      return {
        id: '103',
        name: 'VIP (Multifactor Authentication)',
        shortDescription: 'Provides multifactor authentication for application protection.',
        fullDescription: 'Provides multifactor authentication for application protection.',
        features: [
          'Multifactor Authentication'
        ],
        useCases: [
          "Application protection"
        ],
        competition: [
          'Mic'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [],
        category: 'IMS',
        isActive: true
      };

    case '104': // SiteMinder
      return {
        id: '104',
        name: 'SiteMinder',
        shortDescription: 'Provides authentication and single sign-on (SSO) capabilities.',
        fullDescription: 'Provides authentication and single sign-on (SSO) capabilities.',
        features: [
          "Authentication"
        ],
        useCases: [
          "AuthenticationSSO, OAUTH, SAML"
        ],
        competition: [
          'ForgeRock',
          'ADFS',
          'Ping Access'
        ],
        subscriptionType: 'Perm/Subscription',
        whitepaperLinks: [],
        category: 'IMS',
        isActive: true
      };

    case '105': // VIP Authentication Hub
      return {
        id: '105',
        name: 'VIP Authentication Hub',
        shortDescription: 'Provides authentication with SSO, OAUTH, SAML, FIDO2, MFA, and risk-based authentication.',
        fullDescription: 'Provides authentication with SSO, OAUTH, SAML, FIDO2, MFA, and risk-based authentication.',
        features: [
          "Authentication"
        ],
        useCases: [
          "SSO, OAUTH, SAML, FIDO2, MFA, Risk Based Auth"
        ],
        competition: [
          'Okta',
          'Auth0',
          'Ping Identity',
          'EntraID'
        ],
        subscriptionType: 'Perm/Subscription',
        whitepaperLinks: [],
        category: 'IMS',
        isActive: true
      };

    case '106': // VIP SaaS
      return {
        id: '106',
        name: 'VIP SaaS',
        shortDescription: 'Provides cloud-based authentication with SSO, OAUTH, SAML, FIDO2, and MFA.',
        fullDescription: 'Provides cloud-based authentication with SSO, OAUTH, SAML, FIDO2, and MFA.',
        features: [
          "Authentication"
        ],
        useCases: [
          "SSO, OAUTH, SAML, FIDO2, MFA"
        ],
        competition: [
          'Okta',
          'Auth0',
          'Ping Identity',
          'EntraID'
        ],
        subscriptionType: 'Subscription',
        whitepaperLinks: [],
        category: 'IMS',
        isActive: true
      };

    case '107': // Advanced Authentication
      return {
        id: '107',
        name: 'Advanced Authentication',
        shortDescription: 'Provides authentication with SSO and MFA.',
        fullDescription: 'Provides authentication with SSO and MFA.',
        features: [
          "Authentication"
        ],
        useCases: [
          "SSO, MFA"
        ],
        competition: [
          'Okta',
          'EntraID',
          'Cisco Duo'
        ],
        subscriptionType: 'Perm/Subscription',
        whitepaperLinks: [],
        category: 'IMS',
        isActive: true
      };

    case '108': // Identity Suite
      return {
        id: '108',
        name: 'Identity Suite',
        shortDescription: 'Provides identity management and governance, including identity lifecycle management, user provisioning, and identity governance.',
        fullDescription: 'Provides identity management and governance, including identity lifecycle management, user provisioning, and identity governance.',
        features: [
          "Identity Management and Governance"
        ],
        useCases: [
          "Identity Lifecycle Management, Identity Governance, User service Portal, User provisioning"
        ],
        competition: [
          'Sailpoint',
          'Azure AD',
          'Ping Identity'
        ],
        subscriptionType: 'Perm/Subscription',
        whitepaperLinks: [],
        category: 'IMS',
        isActive: true
      };

    case '109': // PAM (Password Management)
      return {
        id: '109',
        name: 'PAM (Password Management)',
        shortDescription: 'Provides password vault and privilege access management.',
        fullDescription: 'Provides password vault and privilege access management.',
        features: [
          "Password Management"
        ],
        useCases: [
          "Password Vault, Privilege Access management"
        ],
        competition: [
          'Cyberark',
          'Hashcorp'
        ],
        subscriptionType: 'Perm/Subscription',
        whitepaperLinks: [],
        category: 'IMS',
        isActive: true
      };

    case '110': // CA Directory
      return {
        id: '110',
        name: 'CA Directory',
        shortDescription: 'Provides user directory services.',
        fullDescription: 'Provides user directory services.',
        features: [
          "Directory"
        ],
        useCases: [
          "User Directory"
        ],
        competition: [
          'RHDS',
          'AD',
          'Oracle DSEE',
          'OpenLDAP'
        ],
        subscriptionType: 'Perm/Subscription',
        whitepaperLinks: [],
        category: 'IMS',
        isActive: true
      };

    default:
      return {
        id,
        name: `Product ${id}`,
        shortDescription: "A short description of the product",
        fullDescription: "This is a detailed description of the product that explains all its features and benefits in depth. It provides comprehensive information about what the product does, how it works, and why it's valuable.",
        features: [
          "Advanced security features",
          "Cloud-based administration",
          "Real-time monitoring",
          "Automated backups",
          "Multi-factor authentication"
        ],
        competition: [
          "Competitor X",
          "Competitor Y",
          "Competitor Z"
        ],
        useCases: [
          "Enterprise security",
          "Network management",
          "Data protection"
        ],
        subscriptionType: "Subscription",
        whitepaperLinks: [
          { title: "Technical Overview", url: "https://example.com/tech-overview" },
          { title: "Security Whitepaper", url: "https://example.com/security-paper" }
        ],
        category: "Network Security",
        isActive: true
      };
  }
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  // For switching between view and edit mode
  const [isEditing, setIsEditing] = useState(isNew);

  // Track whitepaper links state
  const [whitepaperLinks, setWhitepaperLinks] = useState<Array<{ title: string, url: string }>>([]);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // For form loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetails(id || 'new'),
    enabled: !!id
  });

  // Set up form with react-hook-form
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      shortDescription: '',
      fullDescription: '',
      category: '',
      subscriptionType: '',
      isActive: true,
      whitepaperLinks: [],
    },
  });

  // Update form values when product data is loaded
  React.useEffect(() => {
    console.log("Product data loaded:", product);
    if (product && !isLoading) {
      form.reset({
        name: product.name,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        category: product.category,
        subscriptionType: product.subscriptionType,
        isActive: product.isActive,
        whitepaperLinks: product.whitepaperLinks,
      });

      setWhitepaperLinks(product.whitepaperLinks || []);
    }
  }, [product, isLoading, form]);

  const addWhitepaperLink = () => {
    if (newLinkTitle && newLinkUrl) {
      const newLinks = [...whitepaperLinks, { title: newLinkTitle, url: newLinkUrl }];
      setWhitepaperLinks(newLinks);
      form.setValue('whitepaperLinks', newLinks);
      setNewLinkTitle('');
      setNewLinkUrl('');
    }
  };

  const removeWhitepaperLink = (index: number) => {
    const newLinks = [...whitepaperLinks];
    newLinks.splice(index, 1);
    setWhitepaperLinks(newLinks);
    form.setValue('whitepaperLinks', newLinks);
  };

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      setIsSubmitting(true);
      console.log('Form values to submit:', values);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(
        `Product ${isNew ? 'created' : 'updated'} successfully`,
        { description: `${values.name} has been ${isNew ? 'added to' : 'updated in'} your product catalog.` }
      );

      if (isNew) {
        navigate('/products');
      } else {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(
        `Error ${isNew ? 'creating' : 'updating'} product`,
        { description: `There was an error ${isNew ? 'creating' : 'updating'} the product.` }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 sm:py-8 md:py-12 px-4 max-w-7xl">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
          <div>
            <Skeleton className="h-8 sm:h-10 md:h-12 w-full sm:w-3/4 mb-2 sm:mb-4" />
            <Skeleton className="h-4 sm:h-5 md:h-6 w-full mb-2" />
            <Skeleton className="h-4 sm:h-5 md:h-6 w-full sm:w-2/3 mb-4 sm:mb-6 md:mb-8" />
            <Skeleton className="h-32 sm:h-36 md:h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Show error message
  if (error || !product) {
    return (
      <div className="container mx-auto py-6 sm:py-8 md:py-12 px-4 text-center max-w-3xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Error loading product</h2>
        <p className="text-muted-foreground mb-4 sm:mb-6">
          We couldn't find the product you're looking for.
        </p>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  // Render form for new/edit product
  if (isNew || isEditing) {
    return (
      <div className="container mx-auto py-6 sm:py-8 md:py-12 px-4 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
          <Button
            variant="ghost"
            onClick={() => isNew ? navigate('/products') : setIsEditing(false)}
            className="w-full sm:w-auto"
          >
            <ArrowLeft size={16} className="mr-2" />
            {isNew ? 'Back to Products' : 'Cancel Editing'}
          </Button>
          <h1 className="text-xl sm:text-2xl font-semibold">{isNew ? 'Create New Product' : 'Edit Product'}</h1>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">{isNew ? 'Product Details' : `Editing: ${product.name}`}</CardTitle>
            <CardDescription>
              Fill in the information below to {isNew ? 'create a new product' : 'update this product'}.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs sm:text-sm">
                        The name of your product as it will appear to customers.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the product"
                          {...field}
                          className="min-h-[80px] sm:min-h-[100px]"
                        />
                      </FormControl>
                      <FormDescription className="text-xs sm:text-sm">
                        A concise summary that will appear in product listings.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of the product"
                          className="min-h-[120px] sm:min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs sm:text-sm">
                        Comprehensive details about your product's features and benefits.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sampleCategories.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs sm:text-sm">
                          The category this product belongs to.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subscriptionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subscription Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subscription type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Subscription">Subscription</SelectItem>
                            <SelectItem value="One-time">One-time Purchase</SelectItem>
                            <SelectItem value="Free">Free</SelectItem>
                            <SelectItem value="Trial">Free Trial</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs sm:text-sm">
                          The subscription model for this product.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Whitepaper Links Section */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-medium">Whitepaper Links</h3>
                  <div className="border rounded-md p-3 sm:p-4 space-y-3 sm:space-y-4">
                    {whitepaperLinks.map((link, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-2 space-y-2 sm:space-y-0">
                        <div className="truncate">
                          <p className="font-medium text-sm sm:text-base">{link.title}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{link.url}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWhitepaperLink(index)}
                          className="self-end sm:self-auto"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <Input
                        placeholder="Link Title"
                        value={newLinkTitle}
                        onChange={(e) => setNewLinkTitle(e.target.value)}
                        className="text-sm"
                      />
                      <Input
                        placeholder="URL (https://...)"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addWhitepaperLink}
                      disabled={!newLinkTitle || !newLinkUrl}
                      className="w-full sm:w-auto"
                    >
                      <Link size={16} className="mr-2" />
                      Add Whitepaper Link
                    </Button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 sm:p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm sm:text-base">Product Status</FormLabel>
                        <FormDescription className="text-xs sm:text-sm">
                          Set whether this product is currently active and visible to customers.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => isNew ? navigate('/products') : setIsEditing(false)}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto order-2 sm:order-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto order-1 sm:order-2"
                  >
                    {isSubmitting ? 'Saving...' : isNew ? 'Create Product' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render product details view
  return (
    <div className="container mx-auto py-6 sm:py-8 md:py-12 px-4 max-w-6xl">
      <Button
        variant="ghost"
        className="mb-4 sm:mb-6"
        onClick={() => navigate('/products')}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Products
      </Button>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl font-semibold">{product.name}</h1>
        {/* Edit Product button removed */}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {product.category && (
              <Badge variant="outline">{product.category}</Badge>
            )}
            {product.subscriptionType && (
              <Badge>{product.subscriptionType}</Badge>
            )}
            {!product.isActive && (
              <Badge variant="destructive">Unavailable</Badge>
            )}
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground mb-6">
            {product.shortDescription}
          </p>

          <Tabs defaultValue="overview" className="mb-6 sm:mb-8">
            <TabsList className="inline-flex border-b rounded-none bg-muted/40 mb-4 ml-0">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="competition">Competition</TabsTrigger>
              <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4 sm:mt-6">
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2">Description</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{product.fullDescription}</p>
              </div>

              {product.competition && product.competition.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-medium mb-2">Competition</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base text-muted-foreground">
                    {product.competition.map((competitor, index) => (
                      <li key={index}>{competitor}</li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="features" className="space-y-4 mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-medium mb-2">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {product.features && product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 sm:mr-3 mt-0.5">
                      <Layers size={14} className="text-primary sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base">{feature}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="competition" className="space-y-4 mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-medium mb-2">Competitors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {product.competition && product.competition.map((competitor, index) => (
                  <Card key={index} className="bg-background/50">
                    <CardContent className="p-3 sm:p-4">
                      <h4 className="font-medium text-sm sm:text-base">{competitor}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="use-cases" className="space-y-4 mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-medium mb-2">Common Use Cases</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {product.useCases && product.useCases.map((useCase, index) => (
                  <Card key={index} className="bg-background/50">
                    <CardContent className="p-3 sm:p-4 sm:pt-5">
                      <h4 className="font-medium text-sm sm:text-base mb-1 sm:mb-2">{useCase}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documentation" className="space-y-4 mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-medium mb-2">Whitepapers & Documentation</h3>
              {product.whitepaperLinks && product.whitepaperLinks.length > 0 ? (
                <div className="space-y-3">
                  {product.whitepaperLinks.map((link, index) => (
                    <Card key={index} className="bg-background/50">
                      <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                        <div className="flex items-start sm:items-center">
                          <FileText size={18} className="mr-3 text-purple-600 flex-shrink-0 mt-1 sm:mt-0" />
                          <div className="w-full overflow-hidden">
                            <h4 className="font-medium text-sm sm:text-base">{link.title}</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-md">
                              {link.url}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(link.url, '_blank')}
                          className="self-end sm:self-auto"
                        >
                          View
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-muted-foreground">No documentation available for this product.</p>
              )}
            </TabsContent>
          </Tabs>

          <Separator className="my-6 sm:my-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Products
            </Button>

            {product.whitepaperLinks && product.whitepaperLinks.length > 0 && (
              <Button
                onClick={() => window.open(product.whitepaperLinks[0].url, '_blank')}
                className="w-full sm:w-auto order-1 sm:order-2"
              >
                <FileText size={16} className="mr-2" />
                View Documentation
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
