"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const links=[{href:"/gallery",label:"Portfolio"},{href:"/about",label:"About"},{href:"/book",label:"Contact"}];
export default function Navbar(_props:{isMobile?:boolean}={}){const pathname=usePathname();const[open,setOpen]=useState(false);return <header className="site-header"><Link href="/" className="wordmark" aria-label="Mylestography home">MYLESTOGRAPHY</Link><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open?"Close":"Menu"}</button><nav className={`site-nav ${open?"is-open":""}`} aria-label="Primary navigation">{links.map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)} className={pathname===link.href?"active":""}>{link.label}</Link>)}</nav></header>}
