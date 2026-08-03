from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


OUT = Path("output/pdf")
OUT.mkdir(parents=True, exist_ok=True)
PORTRAIT = Path("assets/dev-ganatra-portrait.jpg")

BLUE = HexColor("#0875C9")
INK = HexColor("#171717")
MUTED = HexColor("#4A4A4A")
LIGHT = HexColor("#D7E8F4")
WHITE = HexColor("#FFFFFF")


CONTENT = {
    "DE": {
        "filename": "Dev_Ganatra_Resume_DE.pdf",
        "role": "TECHNICAL PRODUCT OWNER FÜR EINGEBETTETE SYSTEME",
        "personal": [
            ("Geboren", "08.09.1990 in Nagpur, Indien"),
            ("Familienstand", "verheiratet"),
            ("Kontakt", "ganatra.dev@gmail.com\n0176 70 24 44 33"),
            ("Anschrift", "Merkenicher Str. 59\n50735 Köln"),
            ("Staatsangehörigkeit", "Indisch"),
            ("Aufenthaltstitel", "Niederlassungserlaubnis"),
        ],
        "skills_title": "KENNTNISSE",
        "skills": [
            ("Sprachen", ["Englisch: verhandlungssicher", "Deutsch: verhandlungssicher", "Hindi: Muttersprache", "Gujarati: Muttersprache"]),
            ("Programmierung", ["MATLAB / Simulink", "C / C++", "Python", "Git / SVN", "Jenkins / CI", "C# / .NET", "Qt"]),
            ("Embedded & Produkt", ["Technical Product Ownership", "Backlog- und Stakeholder-Abstimmung", "CAN / AUTOSAR", "Validierung und Integration"]),
            ("Weiterbildungen", ["SAFe 6 Hardware Agilist", "iSAQB Software Architecture", "Design Thinking Fundamentals", "MathWorks Embedded Coder", "MathWorks Simulink Test"]),
        ],
        "education_title": "AUSBILDUNG",
        "education": [
            ("2013-2018", "Albert-Ludwigs-Universität Freiburg", "Master of Science in Embedded Systems Engineering", "Masterarbeit am IMTEK: Electrochemical Sensing and In Situ Corrosion Analysis for Neuroimplants"),
            ("2012-2013", "Goethe-Institut Max Mueller Bhavan, Pune", "Deutsch als Fremdsprache, Niveau B2.1", ""),
            ("2008-2012", "RTM Nagpur University, Indien", "Bachelor of Engineering in Electronics", ""),
        ],
        "experience_title": "BERUFSERFAHRUNG",
        "experience": [
            ("01/2022-HEUTE", "Vaillant Group, Remscheid", "Technical Product Owner - Sustaining Project | Innovation HW/SW Specialist", [
                "Product Ownership für Sustaining-Arbeit: Stakeholder ausrichten, Backlog priorisieren und HW/SW-Abhängigkeiten steuern",
                "Lieferentscheidungen mit Systemgrenzen, Integration und Validierung verbinden",
                "Modellbasierte Entwicklung in MATLAB / Simulink, Code-Generierung und Continuous Integration",
            ]),
            ("01/2019-12/2021", "Bertrandt Ingenieurbüro GmbH, Köln", "Embedded Softwareentwickler", [
                "Modellbasierte Entwicklung und Programmierwerkzeuge für Heizungsanlagen",
                "End-of-Line-Tool: GUI-Entwicklung in C++ / Qt, Embedded Software und Programmierung eingebetteter Computer",
                "AUTOSAR-Anwendungen, Diagnose, Unit-Testing, MIL-Test, Integration und statische Codeanalyse",
            ]),
            ("01/2018-12/2018", "Albert-Ludwigs-Universität Freiburg, IMTEK", "Wissenschaftlicher Mitarbeiter, Professur für Sensoren", [
                "Elektrochemische Sensor-Protokolle, In-vivo-Anwendung und Versuchsplanung",
                "Datenvisualisierung und -extraktion mit MATLAB und Python; Ergebnisse peer-reviewed publiziert",
            ]),
            ("10/2015-01/2018", "Albert-Ludwigs-Universität Freiburg, IMTEK", "Wissenschaftliche Hilfskraft, Professur für Sensoren", [
                "Betreuung von Studierenden in Laborpraktika und Aufbau eines Lehrversuchs zur Korrosion",
            ]),
        ],
    },
    "EN": {
        "filename": "Dev_Ganatra_Resume_EN.pdf",
        "role": "TECHNICAL PRODUCT OWNER FOR EMBEDDED SYSTEMS",
        "personal": [
            ("Born", "08 September 1990 in Nagpur, India"),
            ("Marital status", "married"),
            ("Contact", "ganatra.dev@gmail.com\n+49 176 70 24 44 33"),
            ("Address", "Merkenicher Str. 59\n50735 Cologne, Germany"),
            ("Nationality", "Indian"),
            ("Residence status", "Permanent residence permit"),
        ],
        "skills_title": "SKILLS",
        "skills": [
            ("Languages", ["English: professional proficiency", "German: professional proficiency", "Hindi: native", "Gujarati: native"]),
            ("Programming", ["MATLAB / Simulink", "C / C++", "Python", "Git / SVN", "Jenkins / CI", "C# / .NET", "Qt"]),
            ("Embedded & product", ["Technical product ownership", "Backlog and stakeholder alignment", "CAN / AUTOSAR", "Validation and integration"]),
            ("Credentials", ["SAFe 6 Hardware Agilist", "iSAQB Software Architecture", "Design Thinking Fundamentals", "MathWorks Embedded Coder", "MathWorks Simulink Test"]),
        ],
        "education_title": "EDUCATION",
        "education": [
            ("2013-2018", "University of Freiburg, Germany", "Master of Science in Embedded Systems Engineering", "Master's thesis at IMTEK: Electrochemical Sensing and In Situ Corrosion Analysis for Neuroimplants"),
            ("2012-2013", "Goethe-Institut Max Mueller Bhavan, Pune", "German as a foreign language, level B2.1", ""),
            ("2008-2012", "RTM Nagpur University, India", "Bachelor of Engineering in Electronics", ""),
        ],
        "experience_title": "PROFESSIONAL EXPERIENCE",
        "experience": [
            ("01/2022-PRESENT", "Vaillant Group, Remscheid", "Technical Product Owner - Sustaining Project | Innovation HW/SW Specialist", [
                "Product ownership for sustaining work: align stakeholders, prioritise the backlog, and manage HW/SW dependencies",
                "Connect delivery decisions with system constraints, integration, and validation",
                "Model-based development in MATLAB / Simulink, code generation, and continuous integration",
            ]),
            ("01/2019-12/2021", "Bertrandt Ingenieurbüro GmbH, Cologne", "Embedded Software Development Engineer", [
                "Model-based development and engineering tools for heating systems",
                "End-of-line tool: GUI development in C++ / Qt, embedded software, and embedded-computer programming",
                "AUTOSAR applications, diagnostics, unit testing, MIL testing, integration, and static code analysis",
            ]),
            ("01/2018-12/2018", "University of Freiburg, IMTEK", "Research Associate, Laboratory for Sensors", [
                "Electrochemical sensing protocols, in-vivo application, and experimental design",
                "Data visualisation and extraction with MATLAB and Python; results published in a peer-reviewed journal",
            ]),
            ("10/2015-01/2018", "University of Freiburg, IMTEK", "Research Assistant, Laboratory for Sensors", [
                "Supported students in laboratory courses and built a teaching experiment for corrosion analysis",
            ]),
        ],
    },
}


def wrap(text, font, size, width):
    lines, current = [], ""
    for word in text.split():
        candidate = f"{current} {word}".strip()
        if stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_lines(c, text, x, y, width, font="Times-Roman", size=8.2, leading=9.5, color=INK):
    c.setFillColor(color)
    c.setFont(font, size)
    for paragraph in text.split("\n"):
        for line in wrap(paragraph, font, size, width):
            c.drawString(x, y, line)
            y -= leading
    return y


def draw_bullets(c, items, x, y, width, size=7.9, leading=9.2):
    for item in items:
        c.setFillColor(BLUE)
        c.circle(x + 2.2, y + 2.2, 1.4, fill=1, stroke=0)
        y = draw_lines(c, item, x + 9, y, width - 9, size=size, leading=leading)
        y -= 1.8
    return y


def section_title(c, title, x, y):
    c.setFillColor(INK)
    c.setFont("Times-Bold", 14.5)
    c.drawString(x, y, title)
    return y - 20


def build(language):
    data = CONTENT[language]
    path = OUT / data["filename"]
    width, height = A4
    c = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
    c.setTitle(f"Dev Ganatra - CV {language}")
    c.setAuthor("Dev Praful Ganatra")
    c.setSubject("Technical Product Owner for embedded systems")
    c.setFillColor(WHITE)
    c.rect(0, 0, width, height, fill=1, stroke=0)

    left_x, left_w, divider_x = 28, 140, 180
    main_x, main_w = 195, width - 220

    # Portrait and visual divider reproduce the supplied Overleaf two-column style.
    portrait_w, portrait_h = 102, 127.5
    portrait_y = height - 158
    c.drawImage(ImageReader(str(PORTRAIT)), left_x, portrait_y, portrait_w, portrait_h, preserveAspectRatio=True, anchor="c")
    c.setStrokeColor(BLUE)
    c.setLineWidth(1)
    c.rect(left_x, portrait_y, portrait_w, portrait_h, fill=0, stroke=1)
    c.setStrokeColor(BLUE)
    c.setLineWidth(1.2)
    c.setDash(1.4, 3.5)
    c.line(divider_x, 24, divider_x, height - 20)
    c.setDash()

    # Main header.
    c.setFillColor(BLUE)
    c.setFont("Times-Bold", 25)
    c.drawString(main_x, height - 47, "Dev Ganatra")
    c.setFillColor(INK)
    c.setFont("Times-BoldItalic", 12.5)
    c.drawString(main_x, height - 70, data["role"])

    # Sidebar personal details.
    y = portrait_y - 14
    for label, value in data["personal"]:
        c.setFillColor(INK)
        c.setFont("Times-Bold", 8.8)
        c.drawString(left_x, y, label)
        y -= 10.2
        y = draw_lines(c, value, left_x, y, left_w, size=8.2, leading=9.2)
        y -= 5.5

    c.setFont("Times-Bold", 10.5)
    c.drawString(left_x, y, data["skills_title"])
    y -= 16
    for group, values in data["skills"]:
        c.setFillColor(INK)
        c.setFont("Times-BoldItalic", 8.5)
        c.drawString(left_x, y, group)
        y -= 10.3
        y = draw_bullets(c, values, left_x, y, left_w, size=7.6, leading=8.6)
        y -= 5

    # Education.
    y = section_title(c, data["education_title"], main_x, height - 105)
    for years, institution, degree, detail in data["education"]:
        c.setFillColor(BLUE)
        c.setFont("Times-Bold", 9.7)
        c.drawString(main_x, y, f"{years}, {institution}")
        y -= 11.5
        y = draw_lines(c, degree, main_x, y, main_w, font="Times-Roman", size=8.8, leading=10)
        if detail:
            y = draw_lines(c, detail, main_x, y - 1, main_w, size=7.8, leading=9)
        y -= 7

    # Experience.
    y = section_title(c, data["experience_title"], main_x, y + 1)
    for years, company, role, bullets in data["experience"]:
        c.setFillColor(BLUE)
        c.setFont("Times-Bold", 9.6)
        c.drawString(main_x, y, f"{years}, {company}")
        y -= 11.5
        y = draw_lines(c, role, main_x, y, main_w, font="Times-BoldItalic", size=8.7, leading=9.6)
        y -= 1.5
        y = draw_bullets(c, bullets, main_x + 7, y, main_w - 7, size=7.7, leading=8.8)
        y -= 5

    # Clickable professional links without changing the Overleaf-style appearance.
    link_y = 12
    c.setFont("Times-Roman", 6.8)
    c.setFillColor(MUTED)
    links = [
        ("ganatra.dev@gmail.com", "mailto:ganatra.dev@gmail.com"),
        ("devganatra.github.io", "https://devganatra.github.io/"),
        ("linkedin.com/in/devganatra", "https://www.linkedin.com/in/devganatra"),
        ("github.com/devganatra", "https://github.com/devganatra"),
    ]
    x = main_x
    for index, (label, url) in enumerate(links):
        if index:
            c.drawString(x, link_y, " | ")
            x += stringWidth(" | ", "Times-Roman", 6.8)
        c.drawString(x, link_y, label)
        link_w = stringWidth(label, "Times-Roman", 6.8)
        c.linkURL(url, (x, link_y - 1, x + link_w, link_y + 8), relative=0, thickness=0)
        x += link_w

    c.save()
    return path


if __name__ == "__main__":
    for language in ("EN", "DE"):
        print(build(language))
