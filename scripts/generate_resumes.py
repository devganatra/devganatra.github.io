from pathlib import Path
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


OUT = Path("output/pdf")
OUT.mkdir(parents=True, exist_ok=True)

INK = HexColor("#101418")
BLUE = HexColor("#315DF4")
LIME = HexColor("#D6FA48")
MUTED = HexColor("#626A6F")
LINE = HexColor("#D8DDD7")
PAPER = HexColor("#F7F8F4")
WHITE = HexColor("#FFFFFF")


CONTENT = {
    "EN": {
        "filename": "Dev_Ganatra_Resume_EN.pdf",
        "role": "TECHNICAL PRODUCT OWNER | INNOVATION HW/SW SPECIALIST",
        "summary_title": "PROFILE",
        "summary": (
            "Technical product owner with an embedded engineering foundation. I connect product direction, "
            "stakeholder needs, system constraints, and iterative delivery to make complex connected products "
            "clearer, prioritised, and deliverable."
        ),
        "skills_title": "CAPABILITIES",
        "skills": [
            "Technical product ownership",
            "Stakeholder and backlog alignment",
            "Embedded C / C++ and microcontrollers",
            "MATLAB / Simulink and control systems",
            "Python, C# / .NET, Qt and CI",
            "CAN, AUTOSAR and validation",
        ],
        "education_title": "EDUCATION & CREDENTIALS",
        "education": [
            ("2013 - 2018", "M.Sc. Embedded Systems Engineering", "University of Freiburg | Grade 1.8"),
            ("2008 - 2012", "B.E. Electronics Engineering", "RTM Nagpur University"),
            ("2025", "SAFe Hardware Agilist", "Scaled Agile | SAFe 6"),
        ],
        "experience_title": "EXPERIENCE",
        "experience": [
            ("CURRENT", "Technical Product Owner", "Vaillant Group | Remscheid", "Current assignment within Innovation HW/SW, connecting product priorities, stakeholder needs, system constraints, and embedded engineering delivery."),
            ("2022 - NOW", "Innovation HW/SW Specialist", "Vaillant Group | Remscheid", "Embedded and model-based development, software integration, continuous integration, and engineering-tool development."),
            ("2019 - 2021", "Embedded Software Development Engineer", "Bertrandt Ingenieurbuero | Cologne", "Embedded and model-based software, AUTOSAR applications, diagnostics, Qt interfaces, validation, and automated workflows."),
            ("2018", "Research Associate", "University of Freiburg | IMTEK", "Electrochemical sensing protocols, experimental design, data workflows, and evaluation for neural-interface research."),
            ("2016 - 2018", "Research Assistant", "University of Freiburg | IMTEK", "Laboratory systems, corrosion analysis, infrared sensing, and data acquisition."),
            ("2015 - 2016", "Teaching Tutor", "University of Freiburg", "Led practical flow-sensor laboratory sessions."),
        ],
    },
    "DE": {
        "filename": "Dev_Ganatra_Resume_DE.pdf",
        "role": "TECHNICAL PRODUCT OWNER | INNOVATION HW/SW SPECIALIST",
        "summary_title": "PROFIL",
        "summary": (
            "Technical Product Owner mit fundiertem Embedded-Engineering-Hintergrund. Ich verbinde "
            "Produktausrichtung, Stakeholder-Bedürfnisse, Systemgrenzen und iterative Umsetzung, damit "
            "komplexe vernetzte Produkte klarer, priorisierbar und lieferbar werden."
        ),
        "skills_title": "KOMPETENZEN",
        "skills": [
            "Technical Product Ownership",
            "Stakeholder- und Backlog-Abstimmung",
            "Embedded C / C++ und Mikrocontroller",
            "MATLAB / Simulink und Regelungstechnik",
            "Python, C# / .NET, Qt und CI",
            "CAN, AUTOSAR und Validierung",
        ],
        "education_title": "AUSBILDUNG & ZERTIFIKATE",
        "education": [
            ("2013 - 2018", "M.Sc. Embedded Systems Engineering", "Universität Freiburg | Note 1,8"),
            ("2008 - 2012", "B.E. Electronics Engineering", "RTM Nagpur University"),
            ("2025", "SAFe Hardware Agilist", "Scaled Agile | SAFe 6"),
        ],
        "experience_title": "BERUFSERFAHRUNG",
        "experience": [
            ("AKTUELL", "Technical Product Owner", "Vaillant Group | Remscheid", "Aktuelle Aufgabe im Bereich Innovation HW/SW: Verbindung von Produktprioritäten, Stakeholder-Bedarf, Systemgrenzen und Embedded-Engineering-Umsetzung."),
            ("2022 - HEUTE", "Innovation HW/SW Specialist", "Vaillant Group | Remscheid", "Embedded- und modellbasierte Entwicklung, Softwareintegration, Continuous Integration und Entwicklung interner Engineering-Tools."),
            ("2019 - 2021", "Embedded-Softwareentwickler", "Bertrandt Ingenieurbüro | Köln", "Embedded- und modellbasierte Software, AUTOSAR-Anwendungen, Diagnose, Qt-Oberflächen, Validierung und automatisierte Workflows."),
            ("2018", "Wissenschaftlicher Mitarbeiter", "Universität Freiburg | IMTEK", "Elektrochemische Sensorprotokolle, Versuchsplanung, Daten-Workflows und Auswertung für die Forschung an neuronalen Schnittstellen."),
            ("2016 - 2018", "Wissenschaftliche Hilfskraft", "Universität Freiburg | IMTEK", "Laborsysteme, Korrosionsanalyse, Infrarotsensorik und Datenerfassung."),
            ("2015 - 2016", "Tutor", "Universität Freiburg", "Leitung praktischer Laborübungen zu Durchflusssensoren."),
        ],
    },
}


def wrapped_lines(text, font, size, max_width):
    words = text.split()
    lines, current = [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, width, font="Helvetica", size=8.5, leading=12, color=INK, max_lines=None):
    c.setFont(font, size)
    c.setFillColor(color)
    lines = wrapped_lines(text, font, size, width)
    if max_lines:
        lines = lines[:max_lines]
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def section_label(c, text, x, y, width):
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(x, y, text)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(x, y - 7, x + width, y - 7)
    return y - 22


def build_resume(language):
    data = CONTENT[language]
    path = OUT / data["filename"]
    width, height = A4
    c = canvas.Canvas(str(path), pagesize=A4)
    c.setTitle(f"Dev Ganatra - Resume {language}")
    c.setAuthor("Dev Praful Ganatra")
    c.setSubject("Technical Product Owner and Innovation HW/SW Specialist")
    c.setFillColor(PAPER)
    c.rect(0, 0, width, height, fill=1, stroke=0)

    # Header
    header_h = 126
    c.setFillColor(INK)
    c.rect(0, height - header_h, width, header_h, fill=1, stroke=0)
    c.setFillColor(LIME)
    c.circle(width - 52, height - 40, 10, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 27)
    c.drawString(42, height - 52, "DEV PRAFUL GANATRA")
    c.setFillColor(HexColor("#BBC5CB"))
    c.setFont("Helvetica-Bold", 8)
    c.drawString(43, height - 73, data["role"])
    c.setFont("Helvetica", 7.5)
    c.drawString(43, height - 100, "ganatra.dev@gmail.com  |  devganatra.github.io  |  linkedin.com/in/devganatra  |  github.com/devganatra")

    margin = 42
    gutter = 32
    left_w = 190
    right_x = margin + left_w + gutter
    right_w = width - right_x - margin
    top_y = height - header_h - 28

    # Left column
    y = section_label(c, data["summary_title"], margin, top_y, left_w)
    y = draw_wrapped(c, data["summary"], margin, y, left_w, size=8.4, leading=12.2, color=MUTED) - 18
    y = section_label(c, data["skills_title"], margin, y, left_w)
    for skill in data["skills"]:
        c.setFillColor(BLUE)
        c.circle(margin + 2.5, y + 2.5, 2.2, fill=1, stroke=0)
        y = draw_wrapped(c, skill, margin + 11, y, left_w - 11, size=8, leading=11, color=INK) - 5
    y -= 8
    y = section_label(c, data["education_title"], margin, y, left_w)
    for years, title, institution in data["education"]:
        c.setFillColor(BLUE)
        c.setFont("Helvetica-Bold", 7)
        c.drawString(margin, y, years)
        y -= 12
        y = draw_wrapped(c, title, margin, y, left_w, font="Helvetica-Bold", size=8.3, leading=10.5, color=INK)
        y = draw_wrapped(c, institution, margin, y - 1, left_w, size=7.4, leading=10, color=MUTED) - 12

    # Right column
    y = section_label(c, data["experience_title"], right_x, top_y, right_w)
    for years, title, company, description in data["experience"]:
        c.setFillColor(BLUE)
        c.setFont("Helvetica-Bold", 7)
        c.drawString(right_x, y, years)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(right_x + 76, y, title)
        y -= 13
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Bold", 7.4)
        c.drawString(right_x + 76, y, company)
        y -= 13
        y = draw_wrapped(c, description, right_x + 76, y, right_w - 76, size=7.6, leading=10.5, color=MUTED)
        y -= 16

    c.setStrokeColor(LINE)
    c.line(margin, 27, width - margin, 27)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 6.8)
    c.drawString(margin, 16, "Selected experience and capabilities | Full project portfolio: devganatra.github.io")
    c.drawRightString(width - margin, 16, "Updated July 2026")
    c.save()
    return path


if __name__ == "__main__":
    for lang in ("EN", "DE"):
        print(build_resume(lang))
