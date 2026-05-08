# 🌊 Hinnavaru Blue: Automated Response Protocol

This document defines the dual-notification protocol for the Hinnavaru Blue Initiative platform.

## ✉️ Protocol A: Automated Customer Welcome
**Target**: Form Submitter (Citizen/Scientist/Visitor)
**Subject**: Thank you for connecting with the Hinnavaru Blue Initiative 🌊
**Body Content**: 
> "Thank you for reaching out. We have received your inquiry at our central hub. Our team is currently in the field working on marine conservation and shipwreck projects; we typically respond within 48 hours. Please check our website for latest updates."

---

## ✉️ Protocol B: Internal Admin Alert ("Hello Admin")
**Target**: `hinnavarublue@gmail.com` (Founder & Admin Team)
**Template**: `application/mail/admin_notification.php`
**Subject**: [URGENT] New Mission Inquiry - Hinnavaru Blue Platform

**Structure**:
1. **Brand Header**: Official Initiative Title.
2. **Greeting**: "Hello Admin / Founder,"
3. **Submission Data**: Dynamic list of all form fields (Name, Email, Interest).
4. **Action Link**: Deep link to the Concrete CMS Dashboard.

---

## 🛠️ Technical Configuration
1. **SMTP Auth**: Use Gmail App Password in `application/config/mail.php`.
2. **Recipient**: In the CMS Form Block, set "Notify Email" to `hinnavarublue@gmail.com`.
3. **Template Mapping**: The `admin_notification.php` template in the mail folder will be used for internal alerts.
