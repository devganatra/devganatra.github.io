window.portfolioContent = {
  en: {
    cases: {
      vaillant: {
        eyebrow: "VAILLANT GROUP · CURRENT",
        title: "Connected climate products",
        intro: "Technical product ownership for embedded products where customer value, hardware, software, integration, and delivery have to move together.",
        sections: [
          ["Context", "Complex connected products create dependencies across product priorities, electronics, embedded software, models, integration, validation, and release planning."],
          ["My role", "Connect product intent with engineering reality: clarify outcomes, shape priorities, make constraints visible, and create an actionable path through the backlog."],
          ["How I work", "Frame the system and stakeholders, expose trade-offs early, break direction into testable increments, and use integration feedback to refine priorities."],
          ["Contribution", "A clearer relationship between product needs and technical work, stronger alignment across disciplines, and delivery decisions grounded in system context."],
        ],
        tags: ["Technical product ownership", "Embedded systems", "Stakeholder alignment", "Agile / SAFe"],
      },
      bertrandt: {
        eyebrow: "BERTRANDT · 2019-2021",
        title: "Embedded software made easier to inspect and ship",
        intro: "Engineering applications and automation that improved how industrial embedded software was configured, diagnosed, validated, and delivered.",
        sections: [
          ["Context", "Automotive and industrial programs needed reliable tooling around embedded applications, diagnostics, flashing, configuration, and validation."],
          ["My role", "Develop embedded and desktop software, create Qt-based interfaces, automate repetitive workflows, and support integration across customer programs."],
          ["Engineering focus", "AUTOSAR applications, CAN communication, C/C++, Python automation, diagnostic workflows, test support, and continuous integration."],
          ["Contribution", "More visible system behaviour, faster engineering feedback, and repeatable workflows that reduced manual effort around delivery."],
        ],
        tags: ["AUTOSAR", "Qt / C++", "CAN", "Python", "CI"],
      },
      research: {
        eyebrow: "UNIVERSITY OF FREIBURG · 2016-2018",
        title: "New sensing methods for neural implants",
        intro: "Experimental systems and electrochemical methods for evaluating sensing concepts in a demanding biomedical research environment.",
        sections: [
          ["Context", "Research into neural interfaces required careful electrochemical experiments, dependable acquisition, and repeatable evaluation of sensor behaviour."],
          ["My role", "Design experiments, prepare laboratory systems, develop measurement workflows, analyse data, and contribute to published research."],
          ["Method", "Turn open research questions into controlled protocols, validate the measurement chain, document observations, and iterate from evidence."],
          ["Contribution", "Reliable experimental workflows and evaluated sensing approaches that supported the wider research programme."],
        ],
        tags: ["Electrochemistry", "Experimental systems", "Data acquisition", "Research"],
      },
    },
    articles: {
      "embedded-product": {
        eyebrow: "PRODUCT × SYSTEMS · 4 MIN",
        title: "Product ownership for embedded systems",
        lead: "Embedded product ownership works best when system constraints are treated as product information, not as engineering detail to be discovered later.",
        paragraphs: [
          "A connected device is shaped by more than a feature list. Electronics, timing, energy, interfaces, safety, manufacturing, integration environments, and release dependencies all affect what can create value and when.",
          "The product owner's job is not to replace systems engineering. It is to make the relationship between outcomes and constraints visible enough for good decisions. That means involving the right disciplines early, expressing uncertainty, and keeping technical enablers connected to a customer or delivery outcome.",
          "A useful backlog therefore contains more than user-facing features. It also makes integration slices, validation needs, architectural decisions, and learning work explicit. The result is a plan that reflects how the product is actually built.",
        ],
        takeaway: "Treat constraints, risks, and integration knowledge as inputs to prioritisation. They are part of the product strategy.",
      },
      "engineering-clarity": {
        eyebrow: "CLARITY × DELIVERY · 4 MIN",
        title: "Turning engineering depth into product clarity",
        lead: "Technical depth becomes valuable to product decisions when it is translated into consequences, options, and evidence.",
        paragraphs: [
          "Complexity is often presented as a catalogue of components. Decision-makers need a different view: what outcome is affected, which dependency matters, what is uncertain, and what happens if we wait.",
          "I use a simple sequence: frame the desired outcome, map the system boundary, identify the decisions, and connect each decision to evidence. This keeps discussions concrete without hiding the engineering reality.",
          "The goal is not to simplify the system until it becomes inaccurate. It is to create layers of explanation so each stakeholder can see the part required for the decision at hand.",
        ],
        takeaway: "Translate technical detail into impact, options, uncertainty, and the next decision.",
      },
      "feedback-delivery": {
        eyebrow: "FEEDBACK × QUALITY · 3 MIN",
        title: "Build feedback into the delivery system",
        lead: "Late integration creates late knowledge. A strong delivery system deliberately produces useful feedback before decisions become expensive.",
        paragraphs: [
          "For embedded products, a feature can look complete inside one discipline while the product remains far from integrated. Interfaces, timing, hardware availability, calibration, and test environments can reveal essential information only when the pieces meet.",
          "Planning should therefore include integration increments and validation evidence, not just implementation tasks. Each increment should answer a question: does the interface work, is performance sufficient, can the behaviour be tested, and what did we learn?",
          "This makes progress more honest. It also gives product ownership better information for reprioritisation and makes quality a property of the delivery loop rather than a final gate.",
        ],
        takeaway: "Plan increments around the feedback they produce, not only the functionality they contain.",
      },
    },
  },
  de: {
    cases: {
      vaillant: {
        eyebrow: "VAILLANT GROUP · AKTUELL",
        title: "Vernetzte Klimalösungen",
        intro: "Technische Produktverantwortung für Embedded-Produkte, bei denen Kundennutzen, Hardware, Software, Integration und Umsetzung gemeinsam vorankommen müssen.",
        sections: [
          ["Kontext", "Komplexe vernetzte Produkte erzeugen Abhängigkeiten zwischen Produktprioritäten, Elektronik, Embedded Software, Modellen, Integration, Validierung und Release-Planung."],
          ["Meine Rolle", "Produktabsicht und Engineering-Realität verbinden: Ziele klären, Prioritäten strukturieren, Randbedingungen sichtbar machen und einen umsetzbaren Weg durch den Backlog schaffen."],
          ["Arbeitsweise", "System und Stakeholder strukturieren, Abwägungen früh sichtbar machen, Richtung in prüfbare Inkremente zerlegen und Integrationsfeedback für neue Prioritäten nutzen."],
          ["Beitrag", "Eine klarere Verbindung zwischen Produktbedarf und technischer Arbeit, bessere Abstimmung der Disziplinen und Entscheidungen auf Basis des Systemkontexts."],
        ],
        tags: ["Technical Product Ownership", "Embedded Systems", "Stakeholder-Abstimmung", "Agile / SAFe"],
      },
      bertrandt: {
        eyebrow: "BERTRANDT · 2019-2021",
        title: "Embedded Software leichter analysierbar und auslieferbar gemacht",
        intro: "Engineering-Anwendungen und Automatisierung für bessere Konfiguration, Diagnose, Validierung und Auslieferung industrieller Embedded Software.",
        sections: [
          ["Kontext", "Automotive- und Industrieprogramme benötigten zuverlässige Tools rund um Embedded-Anwendungen, Diagnose, Flashen, Konfiguration und Validierung."],
          ["Meine Rolle", "Embedded- und Desktop-Software entwickeln, Qt-Oberflächen erstellen, wiederkehrende Abläufe automatisieren und Integrationen in Kundenprogrammen unterstützen."],
          ["Technischer Fokus", "AUTOSAR-Anwendungen, CAN-Kommunikation, C/C++, Python-Automatisierung, Diagnoseabläufe, Testunterstützung und Continuous Integration."],
          ["Beitrag", "Sichtbareres Systemverhalten, schnelleres Engineering-Feedback und reproduzierbare Abläufe mit weniger manuellem Aufwand."],
        ],
        tags: ["AUTOSAR", "Qt / C++", "CAN", "Python", "CI"],
      },
      research: {
        eyebrow: "UNIVERSITÄT FREIBURG · 2016-2018",
        title: "Neue Sensormethoden für neuronale Implantate",
        intro: "Experimentelle Systeme und elektrochemische Methoden zur Bewertung von Sensorkonzepten in einem anspruchsvollen biomedizinischen Forschungsumfeld.",
        sections: [
          ["Kontext", "Die Forschung an neuronalen Schnittstellen erforderte sorgfältige elektrochemische Experimente, verlässliche Datenerfassung und reproduzierbare Bewertung des Sensorverhaltens."],
          ["Meine Rolle", "Experimente planen, Laborsysteme vorbereiten, Messabläufe entwickeln, Daten analysieren und zu Veröffentlichungen beitragen."],
          ["Methode", "Offene Forschungsfragen in kontrollierte Protokolle übersetzen, die Messkette validieren, Beobachtungen dokumentieren und evidenzbasiert iterieren."],
          ["Beitrag", "Zuverlässige experimentelle Abläufe und bewertete Sensoransätze als Unterstützung des übergeordneten Forschungsprogramms."],
        ],
        tags: ["Elektrochemie", "Experimentalsysteme", "Datenerfassung", "Forschung"],
      },
    },
    articles: {
      "embedded-product": {
        eyebrow: "PRODUKT × SYSTEME · 4 MIN",
        title: "Product Ownership für Embedded Systems",
        lead: "Embedded Product Ownership funktioniert am besten, wenn Systemgrenzen als Produktinformation gelten und nicht erst spät als Engineering-Detail auftauchen.",
        paragraphs: [
          "Ein vernetztes Gerät wird durch mehr als eine Feature-Liste geprägt. Elektronik, Timing, Energie, Schnittstellen, Sicherheit, Fertigung, Integrationsumgebungen und Release-Abhängigkeiten beeinflussen, welcher Nutzen wann entstehen kann.",
          "Product Ownership ersetzt kein Systems Engineering. Die Aufgabe besteht darin, die Beziehung zwischen Ergebnissen und Randbedingungen so sichtbar zu machen, dass gute Entscheidungen möglich werden.",
          "Ein sinnvoller Backlog enthält deshalb neben kundenwirksamen Funktionen auch Integrationsschritte, Validierungsbedarf, Architekturentscheidungen und Lernarbeit. So bildet der Plan ab, wie das Produkt tatsächlich entsteht.",
        ],
        takeaway: "Randbedingungen, Risiken und Integrationswissen sind Eingaben für die Priorisierung - und damit Teil der Produktstrategie.",
      },
      "engineering-clarity": {
        eyebrow: "KLARHEIT × UMSETZUNG · 4 MIN",
        title: "Engineering-Tiefe in Produktklarheit übersetzen",
        lead: "Technische Tiefe wird für Produktentscheidungen wertvoll, wenn sie in Konsequenzen, Optionen und Evidenz übersetzt wird.",
        paragraphs: [
          "Komplexität wird häufig als Liste von Komponenten beschrieben. Für Entscheidungen braucht es eine andere Sicht: Welches Ergebnis ist betroffen, welche Abhängigkeit zählt, was ist unsicher und was geschieht bei Verzögerung?",
          "Ich nutze eine einfache Folge: gewünschtes Ergebnis klären, Systemgrenze abbilden, Entscheidungen identifizieren und jede Entscheidung mit Evidenz verbinden.",
          "Das System soll nicht so stark vereinfacht werden, dass die Darstellung falsch wird. Stattdessen entstehen Erklärungsebenen, auf denen jeder Stakeholder den für die aktuelle Entscheidung relevanten Ausschnitt sieht.",
        ],
        takeaway: "Technische Details in Wirkung, Optionen, Unsicherheit und die nächste Entscheidung übersetzen.",
      },
      "feedback-delivery": {
        eyebrow: "FEEDBACK × QUALITÄT · 3 MIN",
        title: "Feedback in das Delivery-System einbauen",
        lead: "Späte Integration erzeugt spätes Wissen. Ein starkes Delivery-System produziert bewusst Feedback, bevor Entscheidungen teuer werden.",
        paragraphs: [
          "Bei Embedded-Produkten kann eine Funktion innerhalb einer Disziplin fertig wirken, obwohl das Produkt noch lange nicht integriert ist. Schnittstellen, Timing, Hardware-Verfügbarkeit, Kalibrierung und Testumgebungen liefern entscheidendes Wissen erst im Zusammenspiel.",
          "Planung sollte deshalb Integrationsinkremente und Validierungsevidenz enthalten - nicht nur Implementierungsaufgaben. Jedes Inkrement sollte eine Frage beantworten.",
          "So wird Fortschritt ehrlicher. Gleichzeitig erhält Product Ownership bessere Informationen für neue Prioritäten, und Qualität wird Teil der Delivery-Schleife statt eines abschließenden Gates.",
        ],
        takeaway: "Inkremente nach dem Feedback planen, das sie erzeugen - nicht nur nach der enthaltenen Funktionalität.",
      },
    },
  },
};
