/* 
  ===== HINNAVARU BLUE — CONTENT MANAGEMENT SYSTEM (CMS) =====
  Use this file to update the site's dynamic content without touching the UI code.
  Simply edit the arrays and strings below.
*/

export const CMS_CONFIG = {
  ngo_registration: "493-NGO/CERT/2026/10",
  registration_date: "February 4, 2026",
  last_updated: "March 26, 2026",


  atoll: "Lhaviyani (Lh.)",
  location_code: "LH..G1",
  country_code: "MV",
  admin_email: "admin@hinnavarublueinitiative.org",
  founder_email: "founder@hinnavarublueinitiative.org",
  hello_email: "hello@hinnavarublueinitiative.org",
  contact_email: "hello@hinnavarublueinitiative.org",
  support_email: "admin@hinnavarublueinitiative.org",
  hotline: "+9607714340",
  mailer_url: "https://mailer-service-1085797488900.asia-southeast1.run.app/send",
  whatsapp_link: "https://wa.me/9607714340",
  telegram_link: "tg://resolve?phone=9607714340",
  socials: {
    whatsapp_link: "https://wa.me/9607714340",
    telegram_link: "tg://resolve?phone=9607714340"
  },
  media_automation: {
    // 📂 CHANGE MEDIA FOLDER: Copy the Folder ID from Google Drive URL and paste it here
    drive_id: "1RButp5B8quSmH1NEA6E9N8YD_uIkxtE_",
    sync_folder: "public/media-hub",
    optimize_to: "webp",
    naming_rules: {
      frame_update: "{FRAMEID}_{DATE}.jpg",
      slideshow: "PROJ_SLIDE_{N}.jpg",
      hero_pulse: "HERO_PULSE_LATEST.mp4"
    }
  }
}

// 1. PROJECT TIMELINE / ARCHIVE (History Page)
export const PROJECT_ARCHIVE = [
  { year: 'Sep 2026', title: 'Smart-Reef 1.0 Launch', desc: 'Planned deployment of 12 IoT monitoring buoys across the deep lagoon zones.' },
  { year: 'Jun 2026', title: 'North Lagoon Reforestation', desc: 'Targeting 500 total active frames by mid-summer. Expansion into Zone E.' },
  { year: 'Mar 2026', title: 'Q1 Impact Report Published', desc: 'Latest survival metrics mapped. Our active nurseries hit an 82% success rate.' },
  { year: 'Feb 2026', title: 'Skipjack II Zone Expansion', desc: '15 new high-density frames deployed around the vertical wreck site.' },
  { year: 'Jan 2026', title: 'Guardian Diver Training', desc: '6 local youths certified for marine monitoring and frame maintenance.' },
  { year: 'Dec 2025', title: '2025 Annual Audit', desc: 'Transparency report finalized showing 100% fund allocation to the reef.' },
  { year: 'Nov 2025', title: 'Nursery Wave Breaker', desc: 'Installed protective surge-guards for the sensitive South Channel zone.' },
  { year: 'Oct 2025', title: 'Lhaviyani Atoll Registry Go-Live', desc: 'Public digital registry launched for real-time tracking of adopted frames.' },
]

// 2. CORAL NURSERY REGISTRY (Registry & Live Map)
export const CORAL_REGISTRY = [
  { id: 'HBF-001', species: 'Acropora muricata', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Ahmed & Family', date: '2023-01-15', status: 'healthy', survival: 94, lat: 5.4905, lng: 73.4065 },
  { id: 'HBF-002', species: 'Porites lobata', location: 'North Lagoon, Zone A', depth: '3m', adopter: 'Maldives Marine Fund', date: '2023-01-15', status: 'healthy', survival: 88, lat: 5.4895, lng: 73.4055 },
  { id: 'HBF-003', species: 'Acropora tenuis', location: 'East Reef, Zone B', depth: '6m', adopter: 'Fathimath Rasheed', date: '2023-02-20', status: 'stable', survival: 76, lat: 5.4910, lng: 73.4070 },
  { id: 'HBF-004', species: 'Pocillopora damicornis', location: 'South Channel, Zone C', depth: '5m', adopter: 'Anonymous', date: '2023-03-05', status: 'attention', survival: 61, lat: 5.4890, lng: 73.4050 },
  { id: 'HBF-005', species: 'Montipora capricornis', location: 'West Lagoon, Zone D', depth: '4m', adopter: 'Blue Ocean NGO', date: '2023-03-18', status: 'healthy', survival: 91, lat: 5.4908, lng: 73.4058 },
  { id: 'HBF-006', species: 'Acropora millepora', location: 'North Lagoon, Zone A', depth: '3m', adopter: 'Ibrahim Ali', date: '2023-04-02', status: 'stable', survival: 79, lat: 5.4892, lng: 73.4068 },
  { id: 'HBF-007', species: 'Stylophora pistillata', location: 'East Reef, Zone B', depth: '7m', adopter: 'Reef Tech Ltd', date: '2023-04-20', status: 'healthy', survival: 87, lat: 5.4902, lng: 73.4072 },
  { id: 'HBF-008', species: 'Platygyra daedalea', location: 'South Channel, Zone C', depth: '5m', adopter: 'UNESCO MFF', date: '2023-05-11', status: 'critical', survival: 42, lat: 5.4888, lng: 73.4048 },
  { id: 'HBF-009', species: 'Galaxea fascicularis', location: 'West Lagoon, Zone D', depth: '4m', adopter: 'Hassan Mohamed', date: '2023-05-30', status: 'healthy', survival: 93, lat: 5.4912, lng: 73.4062 },
  { id: 'HBF-010', species: 'Acropora florida', location: 'North Lagoon, Zone A', depth: '3m', adopter: 'Coral Hope Foundation', date: '2023-06-15', status: 'stable', survival: 72, lat: 5.4898, lng: 73.4075 },
  { id: 'HBF-011', species: 'Acropora humilis', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Mariyam Shifa', date: '2023-07-10', status: 'healthy', survival: 91, lat: 5.4901, lng: 73.4060 },
  { id: 'HBF-012', species: 'Pocillopora verrucosa', location: 'South Channel, Zone C', depth: '5m', adopter: 'Zaidan Ali', date: '2023-07-25', status: 'stable', survival: 84, lat: 5.4887, lng: 73.4052 },
  { id: 'HBF-013', species: 'Porites lutea', location: 'East Reef, Zone B', depth: '6m', adopter: 'Aishath Leen', date: '2023-08-05', status: 'healthy', survival: 95, lat: 5.4909, lng: 73.4071 },
  { id: 'HBF-014', species: 'Montipora digitata', location: 'North Lagoon, Zone A', depth: '3m', adopter: 'Ismail Naseer', date: '2023-08-12', status: 'healthy', survival: 89, lat: 5.4896, lng: 73.4059 },
  { id: 'HBF-015', species: 'Acropora hyacinthus', location: 'West Lagoon, Zone D', depth: '4m', adopter: 'Ali Riza', date: '2023-09-02', status: 'stable', survival: 77, lat: 5.4913, lng: 73.4064 },
  { id: 'HBF-016', species: 'Acropora cervicornis', location: 'North Lagoon, Zone A', depth: '5m', adopter: 'Moosa Adam', date: '2023-09-18', status: 'healthy', survival: 92, lat: 5.4899, lng: 73.4067 },
  { id: 'HBF-017', species: 'Pocillopora eydouxi', location: 'South Channel, Zone C', depth: '6m', adopter: 'Aminath Reehan', date: '2023-10-05', status: 'attention', survival: 68, lat: 5.4889, lng: 73.4054 },
  { id: 'HBF-018', species: 'Porites solida', location: 'East Reef, Zone B', depth: '4m', adopter: 'Ibrahim Siraaj', date: '2023-10-22', status: 'healthy', survival: 90, lat: 5.4906, lng: 73.4074 },
  { id: 'HBF-019', species: 'Acropora formosa', location: 'West Lagoon, Zone D', depth: '3m', adopter: 'Fathimath Shadia', date: '2023-11-10', status: 'stable', survival: 81, lat: 5.4911, lng: 73.4061 },
  { id: 'HBF-020', species: 'Stylophora mordax', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Musthafa Ali', date: '2023-11-28', status: 'healthy', survival: 93, lat: 5.4897, lng: 73.4063 },
  { id: 'HBF-021', species: 'Acropora cytherea', location: 'East Reef, Zone B', depth: '7m', adopter: 'Hussain Sodiq', date: '2023-12-12', status: 'healthy', survival: 86, lat: 5.4904, lng: 73.4073 },
  { id: 'HBF-022', species: 'Pocillopora woodjonesi', location: 'South Channel, Zone C', depth: '5m', adopter: 'Khadeeja Moosa', date: '2024-01-05', status: 'stable', survival: 78, lat: 5.4886, lng: 73.4051 },
  { id: 'HBF-023', species: 'Porites compressa', location: 'West Lagoon, Zone D', depth: '4m', adopter: 'Ali Shimaz', date: '2024-01-18', status: 'healthy', survival: 91, lat: 5.4914, lng: 73.4066 },
  { id: 'HBF-024', species: 'Acropora valida', location: 'North Lagoon, Zone A', depth: '3m', adopter: 'Shuaib Ahmed', date: '2024-02-02', status: 'stable', survival: 73, lat: 5.4894, lng: 73.4062 },
  { id: 'HBF-025', species: 'Montipora aequituberculata', location: 'East Reef, Zone B', depth: '6m', adopter: 'Mariyam Rizna', date: '2024-02-15', status: 'healthy', survival: 94, lat: 5.4907, lng: 73.4076 },
  { id: 'HBF-026', species: 'Acropora microclados', location: 'South Channel, Zone C', depth: '5m', adopter: 'Ibrahim Waheed', date: '2024-03-01', status: 'stable', survival: 82, lat: 5.4884, lng: 73.4049 },
  { id: 'HBF-027', species: 'Pocillopora ligulata', location: 'West Lagoon, Zone D', depth: '4m', adopter: 'Aishath Shifa', date: '2024-03-12', status: 'healthy', survival: 88, lat: 5.4916, lng: 73.4068 },
  { id: 'HBF-028', species: 'Porites rus', location: 'North Lagoon, Zone A', depth: '3m', adopter: 'Adam Sodiq', date: '2024-03-20', status: 'healthy', survival: 90, lat: 5.4893, lng: 73.4064 },
  { id: 'HBF-029', species: 'Acropora gemmifera', location: 'East Reef, Zone B', depth: '5m', adopter: 'Hawwa Shaira', date: '2024-04-05', status: 'stable', survival: 75, lat: 5.4908, lng: 73.4078 },
  { id: 'HBF-030', species: 'Montipora foliosa', location: 'South Channel, Zone C', depth: '4m', adopter: 'Ali Shareef', date: '2024-04-18', status: 'healthy', survival: 91, lat: 5.4883, lng: 73.4047 },
  { id: 'HBF-031', species: 'Acropora nasuta', location: 'West Lagoon, Zone D', depth: '6m', adopter: 'Fathimath Reeham', date: '2024-05-02', status: 'stable', survival: 80, lat: 5.4918, lng: 73.4070 },
  { id: 'HBF-032', species: 'Pocillopora capitata', location: 'North Lagoon, Zone A', depth: '5m', adopter: 'Ibrahim Rameez', date: '2024-05-15', status: 'healthy', survival: 87, lat: 5.4892, lng: 73.4066 },
  { id: 'HBF-033', species: 'Porites lichen', location: 'East Reef, Zone B', depth: '4m', adopter: 'Aminath Shifa', date: '2024-06-01', status: 'healthy', survival: 92, lat: 5.4903, lng: 73.4079 },
  { id: 'HBF-034', species: 'Acropora clathrata', location: 'South Channel, Zone C', depth: '7m', adopter: 'Zoya Ahmed', date: '2024-06-12', status: 'stable', survival: 76, lat: 5.4882, lng: 73.4046 },
  { id: 'HBF-035', species: 'Montipora flabellata', location: 'West Lagoon, Zone D', depth: '3m', adopter: 'Hassan Sodiq', date: '2024-06-25', status: 'healthy', survival: 89, lat: 5.4919, lng: 73.4072 },
  { id: 'HBF-036', species: 'Acropora abrotanoides', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Mariyam Rizana', date: '2024-07-05', status: 'healthy', survival: 94, lat: 5.4891, lng: 73.4068 },
  { id: 'HBF-037', species: 'Pocillopora setchelli', location: 'East Reef, Zone B', depth: '6m', adopter: 'Ali Naseer', date: '2024-07-18', status: 'stable', survival: 83, lat: 5.4901, lng: 73.4080 },
  { id: 'HBF-038', species: 'Porites vaughani', location: 'South Channel, Zone C', depth: '5m', adopter: 'Musthafa Moosa', date: '2024-08-01', status: 'healthy', survival: 91, lat: 5.4881, lng: 73.4045 },
  { id: 'HBF-039', species: 'Acropora anthocercis', location: 'West Lagoon, Zone D', depth: '4m', adopter: 'Aminath Reeham', date: '2024-08-12', status: 'stable', survival: 79, lat: 5.4920, lng: 73.4074 },
  { id: 'HBF-040', species: 'Montipora turtlensis', location: 'North Lagoon, Zone A', depth: '3m', adopter: 'Ismail Riza', date: '2024-08-25', status: 'healthy', survival: 90, lat: 5.4890, lng: 73.4070 },
  { id: 'HBF-041', species: 'Acropora muricata', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Ahmed Faruq', date: '2024-09-05', status: 'healthy', survival: 95, lat: 5.4906, lng: 73.4069 },
  { id: 'HBF-042', species: 'Porites lobata', location: 'East Reef, Zone B', depth: '3m', adopter: 'Maldives Marine Research', date: '2024-09-12', status: 'healthy', survival: 89, lat: 5.4896, lng: 73.4059 },
  { id: 'HBF-043', species: 'Acropora tenuis', location: 'South Channel, Zone C', depth: '6m', adopter: 'Fathimath Ali', date: '2024-10-02', status: 'stable', survival: 78, lat: 5.4911, lng: 73.4071 },
  { id: 'HBF-044', species: 'Pocillopora damicornis', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Anonymous Adopter', date: '2024-10-15', status: 'stable', survival: 65, lat: 5.4891, lng: 73.4052 },
  { id: 'HBF-045', species: 'Montipora capricornis', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Blue Ocean Fund', date: '2024-11-01', status: 'healthy', survival: 92, lat: 5.4909, lng: 73.4059 },
  { id: 'HBF-046', species: 'Acropora millepora', location: 'East Reef, Zone B', depth: '3m', adopter: 'Ibrahim Shareef', date: '2024-11-10', status: 'stable', survival: 80, lat: 5.4893, lng: 73.4069 },
  { id: 'HBF-047', species: 'Stylophora pistillata', location: 'South Channel, Zone C', depth: '7m', adopter: 'Eco-Guardians', date: '2024-11-20', status: 'healthy', survival: 88, lat: 5.4903, lng: 73.4073 },
  { id: 'HBF-048', species: 'Platygyra daedalea', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'MFF Maldives', date: '2024-12-01', status: 'attention', survival: 45, lat: 5.4889, lng: 73.4049 },
  { id: 'HBF-049', species: 'Galaxea fascicularis', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'H Hassan Didi', date: '2024-12-12', status: 'healthy', survival: 94, lat: 5.4913, lng: 73.4063 },
  { id: 'HBF-050', species: 'Acropora florida', location: 'East Reef, Zone B', depth: '3m', adopter: 'Marine Life Foundation', date: '2024-12-28', status: 'stable', survival: 74, lat: 5.4899, lng: 73.4076 },
  { id: 'HBF-051', species: 'Acropora humilis', location: 'South Channel, Zone C', depth: '4m', adopter: 'Mariyam Nasheeda', date: '2025-01-05', status: 'healthy', survival: 93, lat: 5.4902, lng: 73.4061 },
  { id: 'HBF-052', species: 'Pocillopora verrucosa', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Zaidan Nasir', date: '2025-01-15', status: 'stable', survival: 86, lat: 5.4888, lng: 73.4053 },
  { id: 'HBF-053', species: 'Porites lutea', location: 'North Lagoon, Zone A', depth: '6m', adopter: 'Aisha Reef Group', date: '2025-01-25', status: 'healthy', survival: 96, lat: 5.4910, lng: 73.4072 },
  { id: 'HBF-054', species: 'Montipora digitata', location: 'East Reef, Zone B', depth: '3m', adopter: 'Ismail Moosa', date: '2025-02-02', status: 'healthy', survival: 90, lat: 5.4897, lng: 73.4060 },
  { id: 'HBF-055', species: 'Acropora hyacinthus', location: 'South Channel, Zone C', depth: '4m', adopter: 'Ali Rasheed', date: '2025-02-12', status: 'stable', survival: 79, lat: 5.4914, lng: 73.4065 },
  { id: 'HBF-056', species: 'Acropora cervicornis', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Moosa Nizar', date: '2025-02-28', status: 'healthy', survival: 94, lat: 5.4900, lng: 73.4068 },
  { id: 'HBF-057', species: 'Pocillopora eydouxi', location: 'North Lagoon, Zone A', depth: '6m', adopter: 'Aminath Reehan Didi', date: '2025-03-05', status: 'attention', survival: 70, lat: 5.4890, lng: 73.4055 },
  { id: 'HBF-058', species: 'Porites solida', location: 'East Reef, Zone B', depth: '4m', adopter: 'Ibrahim Naseer Sodiq', date: '2025-03-18', status: 'healthy', survival: 92, lat: 5.4907, lng: 73.4075 },
  { id: 'HBF-059', species: 'Acropora formosa', location: 'South Channel, Zone C', depth: '3m', adopter: 'Fathimath Shazna', date: '2025-04-02', status: 'stable', survival: 83, lat: 5.4912, lng: 73.4062 },
  { id: 'HBF-060', species: 'Stylophora mordax', location: 'West Lagoon, Zone D', depth: '4m', adopter: 'Musthafa Ali Ibrahim', date: '2025-04-15', status: 'healthy', survival: 95, lat: 5.4898, lng: 73.4064 },
  { id: 'HBF-061', species: 'Acropora cytherea', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Zoya Ahmed', date: '2025-05-10', status: 'healthy', survival: 91, lat: 5.4903, lng: 73.4070 },
  { id: 'HBF-062', species: 'Pocillopora woodjonesi', location: 'East Reef, Zone B', depth: '5m', adopter: 'Ali Naseer', date: '2025-05-22', status: 'stable', survival: 82, lat: 5.4891, lng: 73.4055 },
  { id: 'HBF-063', species: 'Porites compressa', location: 'South Channel, Zone C', depth: '6m', adopter: 'Mariyam Rizana', date: '2025-06-05', status: 'healthy', survival: 88, lat: 5.4910, lng: 73.4074 },
  { id: 'HBF-064', species: 'Acropora valida', location: 'West Lagoon, Zone D', depth: '3m', adopter: 'Musthafa Moosa', date: '2025-06-18', status: 'stable', survival: 76, lat: 5.4884, lng: 73.4052 },
  { id: 'HBF-065', species: 'Montipora aequituberculata', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Ibrahim Siraaj', date: '2025-07-02', status: 'healthy', survival: 94, lat: 5.4908, lng: 73.4061 },
  { id: 'HBF-066', species: 'Acropora microclados', location: 'East Reef, Zone B', depth: '5m', adopter: 'Fathimath Shadia', date: '2025-07-15', status: 'stable', survival: 79, lat: 5.4896, lng: 73.4072 },
  { id: 'HBF-067', species: 'Pocillopora ligulata', location: 'South Channel, Zone C', depth: '4m', adopter: 'Hassan Sodiq', date: '2025-07-28', status: 'healthy', survival: 87, lat: 5.4914, lng: 73.4065 },
  { id: 'HBF-068', species: 'Porites rus', location: 'West Lagoon, Zone D', depth: '6m', adopter: 'Aisath Leen', date: '2025-08-10', status: 'stable', survival: 81, lat: 5.4882, lng: 73.4049 },
  { id: 'HBF-069', species: 'Acropora gemmifera', location: 'North Lagoon, Zone A', depth: '5m', adopter: 'Ali Riza', date: '2025-08-22', status: 'healthy', survival: 90, lat: 5.4902, lng: 73.4067 },
  { id: 'HBF-070', species: 'Montipora foliosa', location: 'East Reef, Zone B', depth: '4m', adopter: 'Mariyam Rizna', date: '2025-09-05', status: 'healthy', survival: 93, lat: 5.4889, lng: 73.4075 },
  { id: 'HBF-071', species: 'Acropora nasuta', location: 'South Channel, Zone C', depth: '3m', adopter: 'Ismail Naseer', date: '2025-09-18', status: 'stable', survival: 77, lat: 5.4916, lng: 73.4062 },
  { id: 'HBF-072', species: 'Pocillopora capitata', location: 'West Lagoon, Zone D', depth: '4m', adopter: 'Khadeeja Moosa', date: '2025-10-02', status: 'healthy', survival: 86, lat: 5.4880, lng: 73.4045 },
  { id: 'HBF-073', species: 'Porites lichen', location: 'North Lagoon, Zone A', depth: '7m', adopter: 'Adam Sodiq', date: '2025-10-15', status: 'healthy', survival: 92, lat: 5.4912, lng: 73.4068 },
  { id: 'HBF-074', species: 'Acropora clathrata', location: 'East Reef, Zone B', depth: '5m', adopter: 'Mariyam Didi', date: '2025-11-01', status: 'stable', survival: 78, lat: 5.4893, lng: 73.4078 },
  { id: 'HBF-075', species: 'Montipora flabellata', location: 'South Channel, Zone C', depth: '4m', adopter: 'Ahmed Shareef', date: '2025-11-12', status: 'healthy', survival: 89, lat: 5.4909, lng: 73.4060 },
  { id: 'HBF-076', species: 'Acropora abrotanoides', location: 'West Lagoon, Zone D', depth: '3m', adopter: 'Fathimath Reeham', date: '2025-11-25', status: 'healthy', survival: 91, lat: 5.4887, lng: 73.4047 },
  { id: 'HBF-077', species: 'Pocillopora setchelli', location: 'North Lagoon, Zone A', depth: '6m', adopter: 'Ibrahim Rameez', date: '2025-12-05', status: 'stable', survival: 80, lat: 5.4918, lng: 73.4071 },
  { id: 'HBF-078', species: 'Porites vaughani', location: 'East Reef, Zone B', depth: '5m', adopter: 'Aminath Shifa', date: '2025-12-18', status: 'healthy', survival: 87, lat: 5.4891, lng: 73.4066 },
  { id: 'HBF-079', species: 'Acropora anthocercis', location: 'South Channel, Zone C', depth: '4m', adopter: 'Zoya Ahmed', date: '2026-01-05', status: 'healthy', survival: 95, lat: 5.4903, lng: 73.4079 },
  { id: 'HBF-080', species: 'Montipora turtlensis', location: 'West Lagoon, Zone D', depth: '7m', adopter: 'Ali Naseer', date: '2026-01-18', status: 'stable', survival: 73, lat: 5.4882, lng: 73.4046 },
  { id: 'HBF-081', species: 'Acropora muricata', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Ibrahim Shareef', date: '2026-02-05', status: 'healthy', survival: 92, lat: 5.4915, lng: 73.4075 },
  { id: 'HBF-082', species: 'Porites lobata', location: 'East Reef, Zone B', depth: '3m', adopter: 'Mariyam Rizna', date: '2026-02-12', status: 'stable', survival: 85, lat: 5.4893, lng: 73.4060 },
  { id: 'HBF-083', species: 'Acropora tenuis', location: 'South Channel, Zone C', depth: '6m', adopter: 'Ali Riza', date: '2026-02-20', status: 'healthy', survival: 89, lat: 5.4908, lng: 73.4082 },
  { id: 'HBF-084', species: 'Pocillopora damicornis', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Blue Ocean Fund', date: '2026-03-02', status: 'stable', survival: 77, lat: 5.4886, lng: 73.4058 },
  { id: 'HBF-085', species: 'Montipora capricornis', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'UNESCO MFF', date: '2026-03-10', status: 'healthy', survival: 94, lat: 5.4912, lng: 73.4068 },
  { id: 'HBF-086', species: 'Acropora millepora', location: 'East Reef, Zone B', depth: '3m', adopter: 'Eco-Guardians', date: '2026-03-18', status: 'stable', survival: 82, lat: 5.4899, lng: 73.4052 },
  { id: 'HBF-087', species: 'Stylophora pistillata', location: 'South Channel, Zone C', depth: '7m', adopter: 'Hassan Mohamed', date: '2026-04-01', status: 'healthy', survival: 88, lat: 5.4905, lng: 73.4078 },
  { id: 'HBF-088', species: 'Platygyra daedalea', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Aishath Leen', date: '2026-04-08', status: 'stable', survival: 79, lat: 5.4881, lng: 73.4045 },
  { id: 'HBF-089', species: 'Galaxea fascicularis', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Zaidan Nasir', date: '2026-04-15', status: 'healthy', survival: 91, lat: 5.4918, lng: 73.4062 },
  { id: 'HBF-090', species: 'Acropora florida', location: 'East Reef, Zone B', depth: '3m', adopter: 'Marine Life Foundation', date: '2026-04-22', status: 'stable', survival: 74, lat: 5.4890, lng: 73.4072 },
  { id: 'HBF-091', species: 'Acropora humilis', location: 'South Channel, Zone C', depth: '4m', adopter: 'Ibrahim Ali', date: '2026-03-25', status: 'healthy', survival: 93, lat: 5.4901, lng: 73.4085 },
  { id: 'HBF-092', species: 'Pocillopora verrucosa', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Fathimath Shadia', date: '2026-03-28', status: 'stable', survival: 86, lat: 5.4888, lng: 73.4050 },
  { id: 'HBF-093', species: 'Porites lutea', location: 'North Lagoon, Zone A', depth: '6m', adopter: 'Mariyam Didi', date: '2026-04-01', status: 'healthy', survival: 95, lat: 5.4920, lng: 73.4066 },
  { id: 'HBF-094', species: 'Montipora digitata', location: 'East Reef, Zone B', depth: '3m', adopter: 'Ahmed Fam', date: '2026-04-02', status: 'stable', survival: 81, lat: 5.4895, lng: 73.4055 },
  { id: 'HBF-095', species: 'Acropora hyacinthus', location: 'South Channel, Zone C', depth: '4m', adopter: 'Musthafa Moosa', date: '2026-04-04', status: 'healthy', survival: 89, lat: 5.4907, lng: 73.4075 },
  { id: 'HBF-096', species: 'Acropora cervicornis', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Khadeeja Moosa', date: '2026-04-06', status: 'stable', survival: 78, lat: 5.4884, lng: 73.4052 },
  { id: 'HBF-097', species: 'Pocillopora eydouxi', location: 'North Lagoon, Zone A', depth: '6m', adopter: 'Ali Naseer', date: '2026-03-10', status: 'healthy', survival: 94, lat: 5.4914, lng: 73.4061 },
  { id: 'HBF-098', species: 'Porites solida', location: 'East Reef, Zone B', depth: '4m', adopter: 'Ibrahim Siraaj', date: '2026-03-15', status: 'stable', survival: 88, lat: 5.4897, lng: 73.4072 },
  { id: 'HBF-099', species: 'Acropora formosa', location: 'South Channel, Zone C', depth: '3m', adopter: 'Aisath Leen', date: '2026-03-20', status: 'healthy', survival: 91, lat: 5.4909, lng: 73.4080 },
  { id: 'HBF-100', species: 'Stylophora mordax', location: 'West Lagoon, Zone D', depth: '4m', adopter: 'Hassan Mohamed', date: '2026-03-25', status: 'stable', survival: 84, lat: 5.4881, lng: 73.4048 },
  { id: 'HBF-101', species: 'Acropora cytherea', location: 'North Lagoon, Zone A', depth: '5m', adopter: 'Mariyam Rizna', date: '2026-04-01', status: 'healthy', survival: 92, lat: 5.4922, lng: 73.4068 },
  { id: 'HBF-102', species: 'Pocillopora woodjonesi', location: 'East Reef, Zone B', depth: '4m', adopter: 'Ali Riza', date: '2026-04-05', status: 'stable', survival: 83, lat: 5.4892, lng: 73.4078 },
  { id: 'HBF-103', species: 'Porites compressa', location: 'South Channel, Zone C', depth: '6m', adopter: 'Ahmed Shareef', date: '2026-08-15', status: 'healthy', survival: 95, lat: 5.4906, lng: 73.4060 },
  { id: 'HBF-104', species: 'Acropora valida', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Fathimath Ali', date: '2026-08-22', status: 'stable', survival: 76, lat: 5.4882, lng: 73.4047 },
  { id: 'HBF-105', species: 'Montipora aequituberculata', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Ibrahim Rameez', date: '2026-09-02', status: 'healthy', survival: 91, lat: 5.4918, lng: 73.4071 },
  { id: 'HBF-106', species: 'Acropora microclados', location: 'East Reef, Zone B', depth: '3m', adopter: 'Zoya Ahmed', date: '2026-09-10', status: 'stable', survival: 84, lat: 5.4891, lng: 73.4066 },
  { id: 'HBF-107', species: 'Pocillopora ligulata', location: 'South Channel, Zone C', depth: '6m', adopter: 'Ali Naseer', date: '2026-09-18', status: 'healthy', survival: 95, lat: 5.4903, lng: 73.4079 },
  { id: 'HBF-108', species: 'Porites rus', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Mariyam Didi', date: '2026-10-02', status: 'stable', survival: 77, lat: 5.4880, lng: 73.4045 },
  { id: 'HBF-109', species: 'Acropora gemmifera', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Adam Sodiq', date: '2026-10-10', status: 'healthy', survival: 92, lat: 5.4912, lng: 73.4068 },
  { id: 'HBF-110', species: 'Montipora foliosa', location: 'East Reef, Zone B', depth: '6m', adopter: 'Mariyam Rizana', date: '2026-10-18', status: 'stable', survival: 83, lat: 5.4889, lng: 73.4075 },
  { id: 'HBF-111', species: 'Acropora muricata', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Ahmed Shareef', date: '2026-10-25', status: 'healthy', survival: 92, lat: 5.4910, lng: 73.4070 },

  { id: 'HBF-112', species: 'Porites lobata', location: 'East Reef, Zone B', depth: '3m', adopter: 'Maldives Fund', date: '2026-11-02', status: 'stable', survival: 85, lat: 5.4890, lng: 73.4055 },
  { id: 'HBF-113', species: 'Acropora tenuis', location: 'South Channel, Zone C', depth: '6m', adopter: 'Fathimath Ali', date: '2026-11-10', status: 'healthy', survival: 89, lat: 5.4905, lng: 73.4080 },
  { id: 'HBF-114', species: 'Pocillopora damicornis', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Anonymous', date: '2026-11-18', status: 'stable', survival: 77, lat: 5.4883, lng: 73.4048 },
  { id: 'HBF-115', species: 'Montipora capricornis', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Blue Ocean NGO', date: '2026-12-01', status: 'healthy', survival: 94, lat: 5.4915, lng: 73.4065 },
  { id: 'HBF-116', species: 'Acropora millepora', location: 'East Reef, Zone B', depth: '3m', adopter: 'Ibrahim Siraaj', date: '2026-12-10', status: 'stable', survival: 82, lat: 5.4897, lng: 73.4050 },
  { id: 'HBF-117', species: 'Stylophora pistillata', location: 'South Channel, Zone C', depth: '7m', adopter: 'Reef Tech Ltd', date: '2026-12-22', status: 'healthy', survival: 88, lat: 5.4902, lng: 73.4075 },
  { id: 'HBF-118', species: 'Platygyra daedalea', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'UNESCO MFF', date: '2027-01-05', status: 'stable', survival: 79, lat: 5.4880, lng: 73.4042 },
  { id: 'HBF-119', species: 'Galaxea fascicularis', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Hassan Mohamed', date: '2027-01-15', status: 'healthy', survival: 91, lat: 5.4918, lng: 73.4060 },
  { id: 'HBF-120', species: 'Acropora florida', location: 'East Reef, Zone B', depth: '3m', adopter: 'Coral Hope Foundation', date: '2027-01-28', status: 'stable', survival: 74, lat: 5.4888, lng: 73.4070 },
  { id: 'HBF-121', species: 'Acropora humilis', location: 'South Channel, Zone C', depth: '4m', adopter: 'Mariyam Shifa', date: '2027-02-05', status: 'healthy', survival: 93, lat: 5.4900, lng: 73.4085 },
  { id: 'HBF-122', species: 'Pocillopora verrucosa', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Zaidan Nasir', date: '2027-02-12', status: 'stable', survival: 86, lat: 5.4886, lng: 73.4048 },
  { id: 'HBF-123', species: 'Porites lutea', location: 'North Lagoon, Zone A', depth: '6m', adopter: 'Aisath Leen', date: '2027-02-20', status: 'healthy', survival: 95, lat: 5.4922, lng: 73.4063 },
  { id: 'HBF-124', species: 'Montipora digitata', location: 'East Reef, Zone B', depth: '3m', adopter: 'Ismail Naseer', date: '2027-03-02', status: 'stable', survival: 81, lat: 5.4893, lng: 73.4052 },
  { id: 'HBF-125', species: 'Acropora hyacinthus', location: 'South Channel, Zone C', depth: '4m', adopter: 'Ali Riza', date: '2027-03-10', status: 'healthy', survival: 89, lat: 5.4905, lng: 73.4072 },
  { id: 'HBF-126', species: 'Acropora cervicornis', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Moosa Adam', date: '2027-03-18', status: 'stable', survival: 78, lat: 5.4881, lng: 73.4049 },
  { id: 'HBF-127', species: 'Pocillopora eydouxi', location: 'North Lagoon, Zone A', depth: '6m', adopter: 'Aminath Reehan', date: '2027-04-01', status: 'healthy', survival: 94, lat: 5.4912, lng: 73.4058 },
  { id: 'HBF-128', species: 'Porites solida', location: 'East Reef, Zone B', depth: '4m', adopter: 'Ibrahim Ali', date: '2027-04-08', status: 'stable', survival: 88, lat: 5.4895, lng: 73.4070 },
  { id: 'HBF-129', species: 'Acropora formosa', location: 'South Channel, Zone C', depth: '3m', adopter: 'Fathimath Shadia', date: '2027-04-15', status: 'healthy', survival: 91, lat: 5.4907, lng: 73.4078 },
  { id: 'HBF-130', species: 'Stylophora mordax', location: 'West Lagoon, Zone D', depth: '4m', adopter: 'Musthafa Ali', date: '2027-04-22', status: 'stable', survival: 84, lat: 5.4883, lng: 73.4045 },
  { id: 'HBF-131', species: 'Acropora cytherea', location: 'North Lagoon, Zone A', depth: '5m', adopter: 'Hussain Sodiq', date: '2027-05-02', status: 'healthy', survival: 92, lat: 5.4919, lng: 73.4065 },
  { id: 'HBF-132', species: 'Pocillopora woodjonesi', location: 'East Reef, Zone B', depth: '4m', adopter: 'Khadeeja Moosa', date: '2027-05-10', status: 'stable', survival: 83, lat: 5.4889, lng: 73.4075 },
  { id: 'HBF-133', species: 'Porites compressa', location: 'South Channel, Zone C', depth: '6m', adopter: 'Ali Shimaz', date: '2027-05-18', status: 'healthy', survival: 95, lat: 5.4904, lng: 73.4058 },
  { id: 'HBF-134', species: 'Acropora valida', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Shuaib Ahmed', date: '2027-05-25', status: 'stable', survival: 76, lat: 5.4880, lng: 73.4044 },
  { id: 'HBF-135', species: 'Montipora aequituberculata', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Mariyam Rizna', date: '2027-06-02', status: 'healthy', survival: 91, lat: 5.4916, lng: 73.4069 },
  { id: 'HBF-136', species: 'Acropora microclados', location: 'East Reef, Zone B', depth: '3m', adopter: 'Ibrahim Waheed', date: '2027-06-10', status: 'stable', survival: 84, lat: 5.4887, lng: 73.4063 },
  { id: 'HBF-137', species: 'Pocillopora ligulata', location: 'South Channel, Zone C', depth: '6m', adopter: 'Aisath Shifa', date: '2027-06-18', status: 'healthy', survival: 95, lat: 5.4901, lng: 73.4076 },
  { id: 'HBF-138', species: 'Porites rus', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Adam Sodiq', date: '2027-07-02', status: 'stable', survival: 77, lat: 5.4878, lng: 73.4042 },
  { id: 'HBF-139', species: 'Acropora gemmifera', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Hawwa Shaira', date: '2027-07-10', status: 'healthy', survival: 92, lat: 5.4910, lng: 73.4066 },
  { id: 'HBF-140', species: 'Montipora foliosa', location: 'East Reef, Zone B', depth: '6m', adopter: 'Ali Shareef', date: '2027-07-18', status: 'stable', survival: 83, lat: 5.4885, lng: 73.4072 },
  { id: 'HBF-141', species: 'Acropora muricata', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Aminath Reeham', date: '2027-08-01', status: 'healthy', survival: 92, lat: 5.4925, lng: 73.4068 },
  { id: 'HBF-142', species: 'Porites lobata', location: 'East Reef, Zone B', depth: '3m', adopter: 'Ibrahim Ali', date: '2027-08-08', status: 'stable', survival: 85, lat: 5.4892, lng: 73.4078 },
  { id: 'HBF-143', species: 'Acropora tenuis', location: 'South Channel, Zone C', depth: '6m', adopter: 'Fathimath Shadia', date: '2027-08-15', status: 'healthy', survival: 89, lat: 5.4906, lng: 73.4060 },
  { id: 'HBF-144', species: 'Pocillopora damicornis', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Adam Sodiq', date: '2027-08-22', status: 'stable', survival: 77, lat: 5.4882, lng: 73.4047 },
  { id: 'HBF-145', species: 'Montipora capricornis', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Mariyam Didi', date: '2027-09-02', status: 'healthy', survival: 94, lat: 5.4918, lng: 73.4071 },
  { id: 'HBF-146', species: 'Acropora millepora', location: 'East Reef, Zone B', depth: '3m', adopter: 'Ahmed Shareef', date: '2027-09-10', status: 'stable', survival: 82, lat: 5.4891, lng: 73.4066 },
  { id: 'HBF-147', species: 'Stylophora pistillata', location: 'South Channel, Zone C', depth: '7m', adopter: 'Musthafa Moosa', date: '2027-09-18', status: 'healthy', survival: 88, lat: 5.4903, lng: 73.4079 },
  { id: 'HBF-148', species: 'Platygyra daedalea', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Aisath Leen', date: '2027-10-02', status: 'stable', survival: 79, lat: 5.4880, lng: 73.4045 },
  { id: 'HBF-149', species: 'Galaxea fascicularis', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Ibrahim Siraaj', date: '2027-10-10', status: 'healthy', survival: 91, lat: 5.4912, lng: 73.4068 },
  { id: 'HBF-150', species: 'Acropora florida', location: 'East Reef, Zone B', depth: '3m', adopter: 'Mariyam Rizana', date: '2027-10-18', status: 'stable', survival: 74, lat: 5.4889, lng: 73.4075 },
  { id: 'HBF-151', species: 'Acropora muricata', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'UNESCO MFF', date: '2027-11-01', status: 'healthy', survival: 92, lat: 5.4917, lng: 73.4069 },
  { id: 'HBF-152', species: 'Porites lobata', location: 'East Reef, Zone B', depth: '3m', adopter: 'Blue Ocean Fund', date: '2027-11-08', status: 'stable', survival: 85, lat: 5.4894, lng: 73.4064 },
  { id: 'HBF-153', species: 'Acropora tenuis', location: 'South Channel, Zone C', depth: '6m', adopter: 'Maldives Tourism Authority', date: '2027-11-15', status: 'healthy', survival: 89, lat: 5.4902, lng: 73.4083 },
  { id: 'HBF-154', species: 'Pocillopora damicornis', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Anonymous Diver', date: '2027-11-22', status: 'stable', survival: 77, lat: 5.4887, lng: 73.4052 },
  { id: 'HBF-155', species: 'Montipora capricornis', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Ali Naseer Fam', date: '2027-12-02', status: 'healthy', survival: 94, lat: 5.4909, lng: 73.4060 },
  { id: 'HBF-156', species: 'Acropora millepora', location: 'East Reef, Zone B', depth: '3m', adopter: 'Mariyam Shifa', date: '2027-12-10', status: 'stable', survival: 82, lat: 5.4899, lng: 73.4072 },
  { id: 'HBF-157', species: 'Stylophora pistillata', location: 'South Channel, Zone C', depth: '7m', adopter: 'Hassan Sodiq', date: '2027-12-18', status: 'healthy', survival: 88, lat: 5.4911, lng: 73.4078 },
  { id: 'HBF-158', species: 'Platygyra daedalea', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Zoya Fam', date: '2028-01-05', status: 'stable', survival: 79, lat: 5.4879, lng: 73.4046 },
  { id: 'HBF-159', species: 'Galaxea fascicularis', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Ibrahim Shareef', date: '2028-01-15', status: 'healthy', survival: 91, lat: 5.4915, lng: 73.4055 },
  { id: 'HBF-160', species: 'Acropora florida', location: 'East Reef, Zone B', depth: '3m', adopter: 'Aminath Ali', date: '2028-01-22', status: 'stable', survival: 74, lat: 5.4895, lng: 73.4061 },
  { id: 'HBF-161', species: 'Acropora humilis', location: 'South Channel, Zone C', depth: '4m', adopter: 'Eco-Youth Hinnavaru', date: '2028-02-02', status: 'healthy', survival: 93, lat: 5.4901, lng: 73.4088 },
  { id: 'HBF-162', species: 'Pocillopora verrucosa', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Fathimath Rasheed', date: '2028-02-10', status: 'stable', survival: 86, lat: 5.4884, lng: 73.4050 },
  { id: 'HBF-163', species: 'Porites lutea', location: 'North Lagoon, Zone A', depth: '6m', adopter: 'Ali Riza Fam', date: '2028-02-18', status: 'healthy', survival: 95, lat: 5.4921, lng: 73.4067 },
  { id: 'HBF-164', species: 'Montipora digitata', location: 'East Reef, Zone B', depth: '3m', adopter: 'Mariyam Didi', date: '2028-02-25', status: 'stable', survival: 81, lat: 5.4890, lng: 73.4054 },
  { id: 'HBF-165', species: 'Acropora hyacinthus', location: 'South Channel, Zone C', depth: '4m', adopter: 'Musthafa Moosa Fam', date: '2028-03-02', status: 'healthy', survival: 89, lat: 5.4906, lng: 73.4074 },
  { id: 'HBF-166', species: 'Acropora cervicornis', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Khadeeja Moosa Fam', date: '2028-03-10', status: 'stable', survival: 78, lat: 5.4883, lng: 73.4051 },
  { id: 'HBF-167', species: 'Pocillopora eydouxi', location: 'North Lagoon, Zone A', depth: '6m', adopter: 'Ali Naseer Fam', date: '2028-03-18', status: 'healthy', survival: 94, lat: 5.4913, lng: 73.4062 },
  { id: 'HBF-168', species: 'Porites solida', location: 'East Reef, Zone B', depth: '4m', adopter: 'Ibrahim Siraaj Fam', date: '2028-04-02', status: 'stable', survival: 88, lat: 5.4896, lng: 73.4073 },
  { id: 'HBF-169', species: 'Acropora formosa', location: 'South Channel, Zone C', depth: '3m', adopter: 'Aisath Leen Fam', date: '2028-04-10', status: 'healthy', survival: 91, lat: 5.4908, lng: 73.4081 },
  { id: 'HBF-170', species: 'Stylophora mordax', location: 'West Lagoon, Zone D', depth: '4m', adopter: 'Hassan Mohamed Fam', date: '2028-04-18', status: 'stable', survival: 84, lat: 5.4880, lng: 73.4049 },
  { id: 'HBF-171', species: 'Acropora cytherea', location: 'North Lagoon, Zone A', depth: '5m', adopter: 'Mariyam Rizna Fam', date: '2028-05-01', status: 'healthy', survival: 92, lat: 5.4921, lng: 73.4069 },
  { id: 'HBF-172', species: 'Pocillopora woodjonesi', location: 'East Reef, Zone B', depth: '4m', adopter: 'Ali Riza Fam', date: '2028-05-08', status: 'stable', survival: 83, lat: 5.4891, lng: 73.4079 },
  { id: 'HBF-173', species: 'Porites compressa', location: 'South Channel, Zone C', depth: '6m', adopter: 'Ahmed Shareef Fam', date: '2028-05-15', status: 'healthy', survival: 95, lat: 5.4905, lng: 73.4061 },
  { id: 'HBF-174', species: 'Acropora valida', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Fathimath Ali Fam', date: '2028-05-22', status: 'stable', survival: 76, lat: 5.4881, lng: 73.4048 },
  { id: 'HBF-175', species: 'Montipora aequituberculata', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Ibrahim Rameez Fam', date: '2028-06-02', status: 'healthy', survival: 91, lat: 5.4917, lng: 73.4072 },
  { id: 'HBF-176', species: 'Acropora microclados', location: 'East Reef, Zone B', depth: '3m', adopter: 'Zoya Ahmed Fam', date: '2028-06-10', status: 'stable', survival: 84, lat: 5.4890, lng: 73.4067 },
  { id: 'HBF-177', species: 'Pocillopora ligulata', location: 'South Channel, Zone C', depth: '6m', adopter: 'Ali Naseer Fam', date: '2028-06-18', status: 'healthy', survival: 95, lat: 5.4902, lng: 73.4080 },
  { id: 'HBF-178', species: 'Porites rus', location: 'West Lagoon, Zone D', depth: '5m', adopter: 'Mariyam Didi Fam', date: '2028-07-02', status: 'stable', survival: 77, lat: 5.4879, lng: 73.4046 },
  { id: 'HBF-179', species: 'Acropora gemmifera', location: 'North Lagoon, Zone A', depth: '4m', adopter: 'Adam Sodiq Fam', date: '2028-07-10', status: 'healthy', survival: 92, lat: 5.4911, lng: 73.4069 },
  { id: 'HBF-180', species: 'Montipora foliosa', location: 'East Reef, Zone B', depth: '6m', adopter: 'Mariyam Rizana Fam', date: '2028-07-18', status: 'stable', survival: 83, lat: 5.4888, lng: 73.4076 },
]

// 3. DOCUMENT VAULTS (Awareness & Education)
export const DOCUMENT_VAULTS = [
  { icon: '📜', title: 'NGO Registration Certificate', type: 'Official License', date: 'Feb 2026', category: 'Admin' },
  { icon: '📚', title: 'Coral ID Guide (Lhaviyani Edition)', type: 'Educational', date: '2025', category: 'Awareness' },
  { icon: '🌊', title: 'Coastal Resilience Handbook', type: 'Education', date: '2026', category: 'Awareness' },
  { icon: '💰', title: 'Financial Audit Report 2025', type: 'Official Audit', date: 'Mar 2026', category: 'Admin' },
  { icon: '🪸', title: 'Quarterly Impact Assessment', type: 'Data Report', date: 'Mar 2026', category: 'Admin' },
]

// 4. THE NOTICE BOARD (Live Feed Updates)
export const LATEST_BULLETINS = [
  { icon: '🌍', type: 'Global', text: 'UN Ocean Decade target aligned: Hinnavaru blueprint scaling to 14 atolls.' },
  { icon: '📡', type: 'Live Feed', text: 'Global network detects 0.2°C temp anomaly. High-frequency monitoring activated.' },
  { icon: '🌊', type: 'Mission', text: 'Vision 2030: Restoring critical nursery corridors for 5,000+ localized reef species.' },
  { icon: '📢', type: 'Milestone', text: 'MVR 3.2M milestone passed! 100% of global funding allocated directly to field operations.' },
  { icon: '🪸', type: 'Data', text: 'March survival rates show 82% healthy coverage across 180 tracked frames.' }
]

// 5. FINANCIAL ALLOCATION (Transparency Hub)
export const FUND_ALLOCATION = [
  { label: 'Field Operations & Diving', pct: 42 },
  { label: 'Equipment & Materials', pct: 23 },
  { label: 'Science & Monitoring', pct: 18 },
  { label: 'Education Programs', pct: 12 },
  { label: 'Registry & Technology', pct: 5 },
]

// 6. APPROVED LAGOON GUARDIANS (Certified Volunteers)
export const APPROVED_GUARDIANS = [
  { id: 'GD-00', name: 'Mirror', role: 'Initiator', avatar: '👁️', telegramId: '1116569241' },
  { id: 'GD-01', name: 'Nabeel Hussain', role: 'Lead Diver', avatar: '🤿', telegramId: '1305116955' },
  { id: 'GD-02', name: 'Zoya Ahmed', role: 'Marine Tech', avatar: '👩‍🔬', telegramId: '' },
  { id: 'GD-03', name: 'Ibrahim Ali', role: 'Youth Ambassador', avatar: '🌊', telegramId: '' },
]

// 7. LAGOON STORIES (Time-Limited Reels & Photos)
export const LAGOON_STORIES = [
  { 
    id: 'ST-001', 
    type: 'video', 
    url: '/pulse-update.mp4', 
    guardianId: 'GD-01', 
    timestamp: '2026-03-27T08:00:00Z', 
    expiryDate: '2026-04-10T00:00:00Z' 
  },
  { 
    id: 'ST-002', 
    type: 'photo', 
    url: '/Born-Lagoon.png', 
    guardianId: 'GD-02', 
    timestamp: '2026-03-26T12:00:00Z', 
    expiryDate: '2026-04-12T00:00:00Z' 
  },
  { 
    id: 'ST-003', 
    type: 'photo', 
    url: '/we-are.png', 
    guardianId: 'GD-03', 
    timestamp: '2026-03-25T15:00:00Z', 
    expiryDate: '2026-04-10T00:00:00Z' 
  }
]

// 8. PROJECT CATEGORIES (For Navbar Dropdown)
export const PROJECT_CATEGORIES = [
  { id: 'coral', title: 'Coral Restoration', slug: 'restoration' },
  { id: 'sweep', title: 'Sweep Efforts', slug: 'sweep' },
  { id: 'edu', title: 'Edu Awareness', slug: 'education' },
]

// 9. ACTIVE PROJECTS & PROGRAMS
export const PROJECTS_LIST = [
  {
    category: 'coral',
    emoji: '🪸',
    status: 'active',
    badge: 'Restoration',
    badgeClass: 'badge-teal',
    title: 'Hinnavaru Lagoon Nursery',
    desc: 'Our flagship coral nursery program, deploying over 40 frames across 4.2 km² of the lagoon with bi-weekly monitoring.',
    progress: 82,
    progressLabel: '82% of 2025 survival target met',
    funded: 'MVR 480,000',
    target: 'MVR 600,000',
    actionPrimary: '🤿 Join Next Dive',
    actionPrimaryDone: '✅ Registered!',
    actionSecondary: '📸 View Latest Photos',
    actionSecondaryLink: '#archive'
  },
  {
    category: 'coral',
    emoji: '🌊',
    status: 'active',
    badge: 'Restoration',
    badgeClass: 'badge-teal',
    title: 'Thermotolerant Species Study',
    desc: 'Partnering with IUCN to test 6 coral species for climate resilience in Lhaviyani Atoll conditions. Results inform future planting.',
    progress: 65,
    progressLabel: '65% of research phase complete',
    funded: 'MVR 180,000',
    target: 'MVR 280,000',
    actionPrimary: '🔬 Volunteer in Lab',
    actionPrimaryDone: '✅ Volunteered!',
    actionSecondary: '📋 View Research Notes',
    actionSecondaryLink: '#archive'
  },
  {
    category: 'edu',
    emoji: '🏫',
    status: 'active',
    badge: 'Education',
    badgeClass: 'badge-teal',
    title: 'Youth Education',
    desc: 'Annually marine ecology workshop for school children, building the next generation of ocean stewards in Hinnavaru.',
    progress: 90,
    progressLabel: '90% of 2024-25 curriculum delivered',
    funded: 'MVR 95,000',
    target: 'MVR 95,000',
    actionPrimary: '🎒 Enroll Student',
    actionPrimaryDone: '✅ Enrolled!',
    actionSecondary: '🖼️ View Event Gallery',
    actionSecondaryLink: '#archive'
  },
  {
    category: 'coral',
    emoji: '📡',
    status: 'planned',
    badge: 'Monitoring',
    badgeClass: 'badge-coral',
    title: 'Deep Lagoon Monitoring Array',
    desc: 'Installing 12 IoT sensor buoys to provide real-time temperature, pH, and turbidity data directly into the Live Lagoon dashboard.',
    progress: 20,
    progressLabel: '20% of funding secured',
    funded: 'MVR 60,000',
    target: 'MVR 300,000',
    actionPrimary: '📡 Fund a Buoy',
    actionPrimaryDone: '✅ Pledged!',
    actionSecondary: '📋 Technical Specs',
    actionSecondaryLink: '#registry'
  },
  {
    category: 'sweep',
    emoji: '🧹',
    status: 'active',
    badge: 'Sweep',
    badgeClass: 'badge-teal',
    title: 'Reef Plastic Extraction',
    desc: 'Bi-monthly cleaning of the harbor and Shipyard site to remove derelict fishing gear and household waste.',
    progress: 45,
    progressLabel: '45% of Q2 goal reached',
    funded: 'MVR 12,000',
    target: 'MVR 30,000',
    actionPrimary: '🧹 Volunteer',
    actionPrimaryDone: '✅ Signed Up!',
    actionSecondary: '📊 Impact Data',
    actionSecondaryLink: '#registry'
  },
  {
    title: "Eco-Reef Monitoring",
    category: "coral",
    emoji: "🔍",
    badge: "Monitoring",
    badgeClass: "badge-teal",
    progress: 100,
    progressLabel: "Full Coverage",
    funded: "$1.2k",
    target: "$1.2k",
    desc: "Bi-weekly scanning of all 180+ frames in the nursery area to track survival and growth rates.",
    status: "active",
    actionPrimary: "Join Watch",
    actionPrimaryDone: "Joined",
    actionSecondary: "View Data",
    actionSecondaryLink: "/registry"
  },
  {
    category: 'sweep',
    emoji: '🧹',
    status: 'active',
    badge: 'Sweep',
    badgeClass: 'badge-coral',
    progress: 75,
    progressLabel: 'Registration Open',
    funded: '45/60',
    target: 'Volunteers',
    desc: 'Community beach cleanup focused on the Shipyard vicinity and the East Lagoon shoreline.',
    title: 'Shipyard Cleanup Day',
    actionPrimary: 'Register',
    actionPrimaryDone: 'Registered',
    actionSecondary: 'Guidelines',
    actionSecondaryLink: '/projects'
  },
  {
    category: 'edu',
    emoji: '🔬',
    status: 'upcoming',
    badge: 'Education',
    badgeClass: 'badge-teal',
    progress: 40,
    progressLabel: 'Curriculum Finalized',
    funded: 'MVR 25,000',
    target: 'MVR 60,000',
    title: 'Marine Biology Workshop',
    desc: 'A hands-on, community-led program designed for Hinnavaru youth to master the science of reef restoration. Includes local coral ID guides, survey diving (for older students), and nursery maintenance basics using Hinnavaru Blue protocols.',
    actionPrimary: 'Notify Me',
    actionPrimaryDone: 'Notified',
    actionSecondary: 'Syllabus Details',
    actionSecondaryLink: '#archive',
    syllabus: [
      '1. Introduction to the Hinnavaru Ecosystem',
      '2. Coral Biology & Species ID (Lhaviyani Focus)',
      '3. Restoration Science: The Repurposed Frame Model',
      '4. Monitoring Tools: From Slates to IoT Buoys',
      '5. Climate Adaptation: Finding Resilient Colonies'
    ]
  },
  {
    category: 'sweep',
    emoji: '🕸️',
    status: 'active',
    badge: 'Sweep',
    badgeClass: 'badge-coral',
    progress: 90,
    progressLabel: 'In Progress',
    funded: '12 Nets',
    target: '15 Nets',
    title: 'Ghost Net Removal',
    desc: 'Targeted retrieval of discarded fishing nets from the deep slopes of the outer reef.',
    actionPrimary: 'Join Dive',
    actionPrimaryDone: 'Joined',
    actionSecondary: 'Incident Map',
    actionSecondaryLink: '/projects'
  }
]

// 9. MEDIA ASSETS CONFIG (Placeholders & Posters)
export const LAGOON_ASSETS = {
  pulse_poster: '/Living-L.png', // Fallback poster for the pulse video
}

// 10. SPONSORSHIP TIERS
export const SPONSOR_TIERS = [
  {
    icon: '🌱',
    name: 'Seedling',
    price: 'MVR 500',
    period: '/month',
    perks: [
      'Adopt 1 coral fragment',
      'Name tag on coral frame',
      'Quarterly photo update',
      'Digital certificate',
      'Registry listing',
    ],
  },
  {
    icon: '🪸',
    name: 'Reef Guardian',
    price: 'MVR 2,000',
    period: '/month',
    featured: true,
    perks: [
      'Adopt a full coral frame (12 fragments)',
      'GPS coordinates of your frame',
      'Monthly dive report + photos',
      'Live Lagoon map tracking',
      'Annual recognition plaque',
      'Invitation to annual Guardian Dive Day',
    ],
  },
  {
    icon: '🌊',
    name: 'Ocean Patron',
    price: 'MVR 8,000',
    period: '/month',
    perks: [
      'Adopt a full nursery zone (6 frames)',
      'Zone named after you / your org',
      'Weekly monitoring data feeds',
      'Featured in Impact Report',
      'Corporate CSR documentation',
      'VIP visit to nursery site',
      'Board advisory invitation',
    ],
  },
]

// 11. NURSERY SUMMARY (Used in multiple pages)
export const NURSERY_SUMMARY = {
  active_frames: 180,
  survival_rate: 82,
  total_funds: 'MVR 3.2M',
  field_allocation: 100
}

// 12. ABOUT PAGE NARRATIVE
export const ABOUT_CONTENT = {
  hero: {
    badge: "📖 Our Roots",
    title: "The Channel: The Rise of Blue",
    bg_image: "/Born-Lagoon.png"
  },
  narrative: {
    intro: `For over forty years, two silent giants have stood watch over our waters at the east side of <strong>Felivaru Kandu</strong>. To the world, they are "The Shipyard," a premier diving attraction in the Lhaviyani Atoll and a staple of Maldivian tourism. To us, the people of Hinnavaru, they are <strong>Skipjack I (Mother Boat)</strong> and <strong>Skipjack II</strong>—living monuments to our industrial heritage and the iron foundation of a new blue future.`,
    shipyard: {
      title: "The Shipyard: A Legacy of the Lhaviyani Industry",
      text: "The Shipyard is unique for featuring two distinct vessels that met their end just as the modern Maldives was taking shape. Both have since been reclaimed by the sea, becoming thriving artificial reefs that support a vast metropolis of marine life.",
      vessels: [
        { name: "Skipjack II (The Sentinel)", desc: "The site’s most iconic feature. Originally a vessel for the Felivaru fish factory, it was meant to be scuttled in 1985. However, it caught fire and sank stern-first, leaving its bow protruding vertically out of the water—a rusted North Star for every Hinnavarian traveler." },
        { name: "Skipjack I (The Mother Boat)", desc: "Known affectionately as the Mother Boat, this former cargo ship (Gaafaru) rests at a depth of roughly 30 meters. It sank in 1984 while attempting to reach Felivaru for repairs. It lies approximately 40 meters away from its companion, creating a sheltered underwater corridor where life flourishes." }
      ]
    },
    catalyst: {
      title: "The 2004 Catalyst: From Survival to Stewardship",
      p1: "Our commitment to this site was born from the intersection of industry and tragedy. In 2004, our veteran fishermen—men who had spent their lives navigating the Felivaru fleet—noticed alarming changes in the sea levels at their ancestral grounds.",
      p2: "For the families living near the Harbor Jetty, the December Tsunami was a defining moment of trauma. It forced a realization that changed our community forever: our island’s survival is inextricably linked to the health of our reef.",
      p3: "Driven by this urgency, the idea to <strong>Rise uP</strong> and protect our home was ignited within a single immediate family. Led by founder <strong>Ahmed Nabeel Hussain Didi</strong>, and supported by the shared vision of <strong>Moosa Shaan Hussain Didi</strong>, <strong>Mariyam Nasha</strong>, <strong>Hawwa Shazra</strong>, and <strong>Aminath Rayyan</strong>, the family pledged to transform their experience into action. They realized the reef is our first and most vital line of defense; if the reef dies, the island follows."
    },
    model: {
      title: "The Hinnavaru Blue Model",
      p1: "Rather than waiting for outside intervention, the family combined their technical ingenuity with marine science. Their brainstorming led to the island’s first coral nursery—using repurposed boat frames to turn the tools of their seafaring trade into the cradles of a restored ecosystem.",
      p2: "By 2026, this grassroots movement evolved into Hinnavaru Blue, a formally registered non-profit organization. We are now recognized as one of the Maldives' most successful community-led reef restoration programs, blending technology, indigenous knowledge, and local ownership.",
      bullets: [
        { label: "Indigenous Knowledge", text: "We understand the specific \"micro-currents\" of Felivaru Kandu better than any external survey. We work with the ocean, not against it." },
        { label: "Repurposed Innovation", text: "By using boat frames and local materials, we have achieved exceptionally high survival rates, proving that the best solutions are often found within the community." },
        { label: "The Northern Blueprint", text: "Our model—combining community ownership with open data—is now being studied for expansion across the Noonu, Raa, Baa, and Lhaviyani Atolls." }
      ],
      note: "<p style=\"color: var(--text-secondary); margin-bottom: 24px; font-size: 0.95rem; line-height: 1.6;\">To protect sensitive data while maintaining radical openness, we process document requests manually. Our team will verify your request and respond via email or hotline within <strong>30 to 60 minutes</strong>.</p>"
    },
    why: {
      title: "Why We Restore: The Three Pillars",
      p1: "We recognize that as the climate shifts, we cannot remain passive observers of our own backyard. We restore because of:",
      bullets: [
        { label: "Identity", text: "The vertical bow of Skipjack II and the deep hull of the Mother Boat are monuments to our history. To lose the life beneath them is to lose a chapter of the Hinnavarian story." },
        { label: "Sustainability", text: "From the guesthouses on our shores to the dive dhonis in the channel, our economy relies on the vibrancy of these \"Skipjack Wrecks.\"" },
        { label: "Legacy", text: "The 2004 Tsunami taught us how fragile our home is. Through Hinnavaru Blue, we ensure that forty years from now, our children inherit a \"Blue Frontier\" that is more resilient than the one we fought to save." }
      ]
    },
    footer_quote: "By protecting the Shipyard and scaling the Hinnavaru Blue model, we aren't just saving two old ships—we are securing the heart of the Maldives.",
    footer_tagline: "For Hinnavaru, for the Atolls, and for the Blue Frontier."
  }
}

// 13. CORE VALUES / PILLARS (Archive/General)
export const PILLARS = [
  { icon: '🤝', title: 'Ekuveri', sub: 'Unity', text: 'Fostering shared ownership through inclusive education. We believe restoration succeeds only when we act as one community.' },
  { icon: '🔬', title: 'Ilmu', sub: 'Knowledge', text: 'Blending ancestral Maldivian sea-wisdom with cutting-edge marine science to drive every restoration decision we make.' },
  { icon: '🏛️', title: 'Amaanaiy', sub: 'Integrity', text: 'Absolute transparency in data, community interactions, and funding execution. We are accountable to the reef.' },
  { icon: '🧬', title: 'Tharika', sub: 'Legacy', text: 'Protecting natural capital and preserving our thriving ecosystem to ensure the reefs are there for the generations of tomorrow.' },
  { icon: '🫀', title: 'Vindhu', sub: 'Vitality', text: 'Recognizing the reef as the pulse of Hinnavaru. We prioritize the health of the lagoon as our island’s absolute heartbeat.' },
]

// 14. HOME PAGE CONTENT
export const HOME_CONTENT = {
  hero: {
    title: "Restoring our reef.",
    subtitle: "Empowering our future.",
    desc: "Transforming the Hinnavaru lagoon through science-backed coral gardening and community-led conservation. Be part of the rebirth."
  },
  adopt_overlay: {
    title: "Restore Hinnavaru's Legacy",
    text: "Adopt a coral frame. We will physically tag it with your chosen name, plant it in the Hinnavaru lagoon, and track its real-time growth via our public Live Map."
  },
  mission_strip: {
    quote: "The sea is not separate from us — it is us. Hinnavaru has lived by the lagoon for generations, and it is our duty to ensure it thrives for generations to come.",
    author: "Ahmed Nabeel Hussain Didi, Founder",
    p1: "We believe that lasting ocean conservation is only possible when local communities are at the heart of it — as scientists, guardians, and storytellers.",
    p2: "Hinnavaru Blue combines indigenous knowledge with marine science, digital transparency, and international partnerships to build a model for reef restoration that belongs to the people of Hinnavaru."
  },
  cta_banner: {
    badge: "🪸 Make an Impact",
    title: "Adopt a Coral Frame",
    text: "For as little as MVR 500/month, you can sponsor a coral frame and watch it grow on our Live Lagoon map. Your name, forever etched in the reef.",
    bg_image: "/Adopt-Frame.png"
  }
}

export const IMPACT_PILLARS = [
  {
    icon: '🌿',
    title: 'Coral Nursery Program',
    text: 'Our underwater nurseries propagate resilient coral fragments from local donor colonies, growing them until ready for transplantation.',
  },
  {
    icon: '🤿',
    title: 'Guardian Diver Network',
    text: 'Trained community divers from Hinnavaru perform bi-weekly monitoring and maintenance dives, logging every frame in the registry.',
  },
  {
    icon: '📊',
    title: 'Open Transparency',
    text: 'All financial flows, impact data, and survival metrics are publicly accessible through our Transparency Hub (Amaanaiy).',
  },
  {
    icon: '🛡️',
    title: 'Reef Resilience Science',
    text: 'We partner with marine biologists to select heat-tolerant coral species and develop climate adaptation protocols.',
  },
  {
    icon: '🏘️',
    title: 'Youth Education',
    text: 'Annually marine ecology workshop for school children, building the next generation of ocean stewards in Hinnavaru.',
  },
  {
    icon: '🌐',
    title: 'Digital Registry',
    text: 'Every coral frame has a unique ID. Adopters can track their adopted frames in real-time on the Live Lagoon map.',
  },
]

// 15. SPONSOR PAGE CONTENT
export const SPONSOR_CONTENT = {
  hero: {
    badge: "🪸 Adopt a Frame",
    title: "Leave Your Legacy in the Reef",
    desc: "Every coral frame you adopt is named after you, tracked in the registry, and visible on the Live Lagoon map. Your commitment grows with the coral.",
    bg_image: "/planning-cycle.png"
  },
  guarantee: {
    badge: "💯 Our Guarantee",
    title: "100% Goes to the Reef",
    text: "Administrative and operational costs of Hinnavaru Blue are funded separately through government and institutional grants. Every MVR you contribute goes directly to purchasing coral fragmentation materials, Guardian Diver stipends, equipment maintenance, and scientific monitoring."
  },
  form: {
    badge: "📋 Apply",
    title: "Become an Adopter",
    desc: "Fill in your details and our team will reach out via Hotline or Email within 30 to 60 minutes to confirm your coral frame assignment."
  }
}

// 16. REGISTRY PAGE CONTENT
export const REGISTRY_CONTENT = {
  hero: {
    badge: "🪸 Coral Registry",
    title: "The Reef Guardians Registry",
    desc: "Every coral frame tracked, every dive logged, every adopter acknowledged. Full transparency starts here.",
    bg_image: "/Blue-Registry.png"
  },
  transparency: {
    badge: "🏛️ Amaanaiy",
    title: "Transparency Hub",
    desc: "Accountability is not optional. Every MVR donated is tracked and reported. Every frame has a story.",
    funds: {
      title: "💰 Fund Allocation (2024 Actuals)",
      total: "Total raised: MVR 1,248,000"
    },
    docs: {
      title: "📁 Official Documents",
      desc: "All certificates, audits, and reports — available to view or upon request."
    }
  }
}

// 17. LIVE LAGOON PAGE CONTENT
export const LIVE_LAGOON_CONTENT = {
  hero: {
    badge: "🗺️ Live Monitoring",
    title: "Live Lagoon Map",
    desc: "Real-time visualization of all active coral nursery frames in Hinnavaru lagoon. Click any marker to view frame details, survival data, and adopter info.",
    bg_image: "/Living-L.png"
  }
}
