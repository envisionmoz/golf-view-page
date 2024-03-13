import React, { use } from 'react'
import "../css/app.css";
import { useTranslations } from "next-intl";
import Link from "next/link";

function footer() {
    const ft= useTranslations("Footer")
  return (
    <div className='footer-container'>
        <ul>
            <li>© 2024 GolfView</li>
            <li><Link href={'#'}>{ft("Terms")}</Link></li>
            <li><Link href={'#'}>{ft("Info")}</Link></li>
        </ul>
        <div className='social-media-links'>

        </div>
    </div>
  )
}

export default footer