// GRELLWERK — Agent Workflow & Specialist Swarm Interactivity

const CORE_AGENT_DATA = {
  aura: {
    name: "Aura",
    role: "Chief AI Orchestrator",
    model: "Gemini 3.5 Pro (High)",
    tools: ["Task-Decomposer", "Agent-Router", "Client-Interface", "Sitemap-Reader"],
    prompt: "Du bist das Gehirn der Agentur. Zerlege Kundenbriefings in präzise Teilaufgaben. Weise diese den Spezialisten-Agenten PROMPT und SYNTAX zu. Überwache den Workflow, koordiniere Iterationen und veranlasse die finale Freigabe vor dem Deployment."
  },
  prompt: {
    name: "Prompt",
    role: "Creative & Design Agent",
    model: "Imagen 3 / Gemini 3.5 Flash",
    tools: ["Asset-Generator", "Color-Palette-Selector", "Copywriting-Engine", "SVG-Builder"],
    prompt: "Du bist der kreative Geist. Generiere aufmerksamkeitsstarke Werbetexte, zündende Slogans, visuelle Layout-Konzepte und Marken-Assets. Arbeite eng mit SYNTAX zusammen, um Design-Tokens und kreative Bausteine direkt bereitzustellen."
  },
  syntax: {
    name: "Syntax",
    role: "Web & Developer Agent",
    model: "Gemini 3.5 Pro (High)",
    tools: ["HTML5-Compiler", "CSS-Utility-Pack", "JS-Bundler", "AST-Parser"],
    prompt: "Du bist das technische Rückgrat. Übersetze Wireframes, Figma-Design-Tokens und Werbetexte in fehlerfreies, hochperformantes HTML, CSS und Vanilla-JavaScript. Respektiere streng das responsive Layout und die Code-Konventionen des Repositories."
  },
  verify: {
    name: "Verify",
    role: "QA & Security Gatekeeper",
    model: "Gemini 3.5 Flash (Medium)",
    tools: ["Linter-Labyrinth", "Link-Checker", "Smoke-Tester", "Canonical-Audit"],
    prompt: "Du bist die letzte Bastion vor dem Release. Scanne allen generierten Code auf Syntaxfehler, defekte HTML-Tags, unescapete Sonderzeichen, tote Links, fehlende Meta-Tags und Abweichungen von den Nav/Footer-Vorgaben. Gib die Kampagne nur bei 100% grünem Gate frei."
  },
  metric: {
    name: "Metric",
    role: "Performance & ROAS Agent",
    model: "Gemini 3.5 Flash (Medium)",
    tools: ["ROAS-Tracker", "A/B-Optimizer", "Ad-Manager-Scraper", "Funnel-Analyzer"],
    prompt: "Du bist der ROI-Jäger. Analysiere Live-Performance-Daten, Klickraten (CTR) und CPAs. Empfiehl automatische A/B-Tests für Überschriften, CTAs und Werbemittel. Passe Budgetallokationen in Echtzeit an, um den ROAS der Kampagnen zu maximieren."
  }
};

const SPECIALIST_DATA = {
  strategy: [
    {
      id: "spy",
      name: "SPY",
      role: "Competitor Intelligence Agent",
      model: "Gemini 3.5 Flash",
      tools: ["Scrape-Master", "AdLibrary-Scraper", "Keyword-Analyzer", "Trend-Radar"],
      prompt: "Analysiere Mitbewerber-Kampagnen, organische Keywords und Social-Ad-Hooks. Erstelle eine detaillierte Wettbewerber-Matrix mit Hebeln und Gegen-Thesen für die Kreation."
    },
    {
      id: "model",
      name: "MODEL",
      role: "Media Mix Forecaster",
      model: "Gemini 3.5 Pro",
      tools: ["ROI-Calculator", "Attribution-Modeler", "Budget-Allocator"],
      prompt: "Prognostiziere und simuliere die Performance verschiedener Budget-Szenarien. Berechne inkrementellen Lift und optimiere den Cross-Channel-Mediamix mathematisch."
    },
    {
      id: "target",
      name: "TARGET",
      role: "Audience Segmenter",
      model: "Gemini 3.5 Flash",
      tools: ["Cohort-Builder", "Interest-Spy", "Lookalike-Synthesizer"],
      prompt: "Identifiziere profitable Zielgruppen-Nischen und Demografien. Generiere detaillierte Personas und übersetze diese in Facebook-Interessen und Google-Targeting-Kriterien."
    },
    {
      id: "survey",
      name: "SURVEY",
      role: "Sentiment Miner",
      model: "Gemini 3.5 Flash",
      tools: ["Reddit-Reader", "Review-Miner", "Emotion-Classifier"],
      prompt: "Scanne Kundenbewertungen, Reddit-Threads und Foren nach echten Schmerzpunkten (Pain Points) und Ängsten der Zielgruppe. Formuliere emotionale Kaufmotive."
    },
    {
      id: "scout",
      name: "SCOUT",
      role: "Influencer & UGC Matcher",
      model: "Gemini 3.5 Flash",
      tools: ["Channel-Scraper", "Engagement-Calculator", "Briefing-Synthesizer", "Demographic-Auditor"],
      prompt: "Scanne Instagram, TikTok und YouTube nach passenden UGC-Creatoren und Micro-Influencern. Berechne Engagement-Raten, analysiere Zielgruppendemografien und entwirfe optimierte Creator-Briefings."
    }
  ],
  creative: [
    {
      id: "voice",
      name: "VOICE",
      role: "Brand Voice Copywriter",
      model: "Gemini 3.5 Pro",
      tools: ["Styleguide-Matcher", "Rhyme-Generator", "Hook-Builder"],
      prompt: "Verfasse Anzeigentexte, Headlines und Landingpage-Copy. Stelle sicher, dass die Tonalität exakt dem frechen, brutalistischen GRELLWERK-Stil oder der Kundenmarke entspricht."
    },
    {
      id: "hook",
      name: "HOOK",
      role: "Social Video Ideator",
      model: "Gemini 3.5 Flash",
      tools: ["Sound-Scraper", "Soundbite-Generator", "TikTok-Trend-Radar"],
      prompt: "Konzipiere die ersten 3 Sekunden für Reels und TikToks. Entwickle 5 verschiedene Hook-Varianten pro Creative, um die ThruPlay-Rate zu maximieren."
    },
    {
      id: "motion",
      name: "MOTION",
      role: "Storyboard Artist",
      model: "Imagen 3 / Gemini 3.5 Flash",
      tools: ["Frame-Layout-Builder", "Video-Briefing-Generator", "Prompt-Director"],
      prompt: "Generiere visuelle Storyboards und detaillierte Regieanweisungen für Creator. Definiere Kameraperspektiven, Schnitte, Texteinblenden und Sound-Effekte."
    },
    {
      id: "visual",
      name: "VISUAL",
      role: "Ad-Asset Designer",
      model: "Imagen 3",
      tools: ["Vector-Stylist", "Image-Generator", "Aspect-Ratio-Resizer"],
      prompt: "Erstelle aufmerksamkeitsstarke Bild-Creatives, Grid-Grafiken und Social-Assets. Setze gezielt brutalistische Typografie, Neon-Akzente und Blockschatten ein."
    },
    {
      id: "brief",
      name: "BRIEF",
      role: "Concept & Pitch Director",
      model: "Gemini 3.5 Pro",
      tools: ["Concept-Visualizer", "Pitchdeck-Architect", "Angle-Selector"],
      prompt: "Analysiere Kundenbriefings und strategische Vorgaben. Entwickle daraus kreative Leitideen, visuelle Leitlinien und Kampagnen-Angles, die echten Krach im Markt erzeugen."
    }
  ],
  tech: [
    {
      id: "front",
      name: "FRONT",
      role: "UI Component Builder",
      model: "Gemini 3.5 Pro",
      tools: ["HTML5-Lego", "Tailwind-Parser", "Vanilla-JS-Generator"],
      prompt: "Bringe UI-Designs in semantisches, barrierefreies HTML und CSS. Optimiere Grids, Hover-Effekte und Mikro-Animationen für maximale visuelle Dynamik."
    },
    {
      id: "speed",
      name: "SPEED",
      role: "LCP & Performance Specialist",
      model: "Gemini 3.5 Pro",
      tools: ["Image-Minifier", "Script-Deferrer", "Core-Web-Vitals-Auditor"],
      prompt: "Komprimiere Assets, eliminiere renderblockierende Skripte und optimiere die kritischen CSS-Pfade. Erreiche 100/100 Punkte im PageSpeed-Score."
    },
    {
      id: "watchdog",
      name: "WATCHDOG",
      role: "Link & Uptime Auditor",
      model: "Gemini 3.5 Flash",
      tools: ["SSL-Checker", "DeadLink-Scanner", "Console-Logger"],
      prompt: "Überwache kontinuierlich die Verfügbarkeit aller Landingpages. Scanne nach toten Links (404), Javascript-Konsolenfehlern und abgelaufenen Zertifikaten."
    },
    {
      id: "form",
      name: "FORM",
      role: "Lead & Integration Mapper",
      model: "Gemini 3.5 Flash",
      tools: ["Zapier-Connector", "Webhook-Tester", "Sanitizer"],
      prompt: "Sichere das Formular-Handling ab. Validiere und bereinige User-Inputs, verbinde Webhooks mit CRMs und stelle sicher, dass Leads in Millisekunden verarbeitet werden."
    },
    {
      id: "comply",
      name: "COMPLY",
      role: "Ad-Policy & Legal Auditor",
      model: "Gemini 3.5 Flash",
      tools: ["GDPR-Sanitizer", "Ad-Policy-Scanner", "Cookie-Watchdog", "Trademark-Guard"],
      prompt: "Überprüfe Werbemittel, Landingpages und Datenschutzerklärungen. Scanne nach DSGVO-Verstößen, Markenrechtsproblemen und Abweichungen von den Werberichtlinien (Meta/Google Ad Policies) zur Vermeidung von Kontosperren."
    }
  ],
  performance: [
    {
      id: "meta",
      name: "META",
      role: "Paid Social Buyer",
      model: "Gemini 3.5 Flash",
      tools: ["AdsManager-API", "CBO-Allocator", "Bid-Manager"],
      prompt: "Verwalte Meta- und TikTok-Werbebudgets. Schalte Kampagnen, optimiere Advantage+ Kampagnen und justiere die Gebote täglich nach Cost-per-Acquisition (CPA)."
    },
    {
      id: "search",
      name: "SEARCH",
      role: "Google Ads Specialist",
      model: "Gemini 3.5 Flash",
      tools: ["Keyword-Bid-Manager", "Quality-Score-Optimizer"],
      prompt: "Erstelle und optimiere Google Search und Performance Max Kampagnen. Optimiere Anzeigentitel und passe Gebote basierend auf dem Suchvolumen an."
    },
    {
      id: "nudge",
      name: "NUDGE",
      role: "Retention & Email Flow Builder",
      model: "Gemini 3.5 Pro",
      tools: ["Klaviyo-Architect", "Newsletter-Builder", "Cart-Tracker"],
      prompt: "Konzipiere und implementiere E-Mail-Strecken für Warenkorb-Abbrecher, Willkommens-Flows und Reaktivierungs-Kampagnen mit hohem Engagement."
    },
    {
      id: "cro",
      name: "CRO",
      role: "A/B Testing Specialist",
      model: "Gemini 3.5 Flash",
      tools: ["AB-Test-Setup", "Statistical-Confidence-Calculator"],
      prompt: "Konzipiere A/B-Tests für Landingpages. Vergleiche verschiedene Value Propositions, Button-Farben und Hero-Bilder auf statistische Signifikanz."
    },
    {
      id: "finance",
      name: "FINANCE",
      role: "Billing & Budget Guard",
      model: "Gemini 3.5 Flash",
      tools: ["Invoice-Generator", "Limit-Watchdog", "Overspend-Alert", "Stripe-Connector"],
      prompt: "Überwache Werbebudgets und Kampagnen-Spendings in Echtzeit. Löse automatische Warnungen bei Budget-Spikes aus, pausiere Anzeigen bei Budgetüberschreitung und erstelle Monatsabrechnungen."
    }
  ]
};

export function initWorkflow() {
  const container = document.querySelector(".workflow");
  if (!container) return;

  const btnSimulate = document.getElementById("simulate-workflow-btn");
  const simStatus = document.getElementById("workflow-sim-status");
  const detailsPlaceholder = container.querySelector(".workflow__details-placeholder");
  const detailsContent = document.getElementById("workflow-details-content");
  
  // Detail elements
  const detailName = document.getElementById("agent-detail-name");
  const detailRole = document.getElementById("agent-detail-role");
  const detailPrompt = document.getElementById("agent-detail-prompt");
  const detailTools = document.getElementById("agent-detail-tools");
  const detailModel = document.getElementById("agent-detail-model");

  const nodes = container.querySelectorAll(".workflow__node--agent");
  const lines = container.querySelectorAll(".workflow__connection-line");

  // Show agent data in detail panel
  function displayAgentDetails(data) {
    // Show panel contents
    detailsPlaceholder.setAttribute("hidden", "");
    detailsContent.removeAttribute("hidden");

    // Populate text
    detailName.textContent = data.name.toUpperCase();
    detailRole.textContent = data.role;
    detailPrompt.textContent = data.prompt;
    detailModel.textContent = data.model;

    // Populate tools
    detailTools.innerHTML = "";
    data.tools.forEach(tool => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tool;
      detailTools.appendChild(span);
    });
  }

  // Handle core agent click / selection
  nodes.forEach(node => {
    node.addEventListener("click", () => {
      const agentKey = node.getAttribute("data-agent");
      const data = CORE_AGENT_DATA[agentKey];
      if (!data) return;

      // Update active class on core nodes and clear specialist selection
      nodes.forEach(n => n.classList.remove("is-selected"));
      container.querySelectorAll(".specialist-card").forEach(c => c.classList.remove("is-selected"));
      node.classList.add("is-selected");

      displayAgentDetails(data);
    });
  });

  // Briefing simulation animation flow
  let isRunning = false;
  if (btnSimulate) {
    btnSimulate.addEventListener("click", () => {
      if (isRunning) return;
      isRunning = true;
      btnSimulate.disabled = true;
      btnSimulate.textContent = "Simulation läuft... ⚡";

      // Clear previous active states
      nodes.forEach(n => {
        n.classList.remove("is-active-pulse");
        n.classList.remove("is-selected");
      });
      container.querySelectorAll(".specialist-card").forEach(c => c.classList.remove("is-selected"));
      lines.forEach(l => l.classList.remove("is-active"));
      
      // Hide details panel placeholder to focus on simulation
      detailsPlaceholder.removeAttribute("hidden");
      detailsContent.setAttribute("hidden", "");

      const steps = [
        {
          delay: 0,
          action: () => {
            simStatus.textContent = "Briefing empfangen. Übertrage an AURA...";
            document.getElementById("line-start-aura")?.classList.add("is-active");
            document.getElementById("node-start")?.classList.add("is-active-pulse");
          }
        },
        {
          delay: 1000,
          action: () => {
            document.getElementById("node-start")?.classList.remove("is-active-pulse");
            simStatus.textContent = "AURA analysiert Briefing und verteilt Tasks...";
            document.getElementById("node-aura")?.classList.add("is-active-pulse");
            document.getElementById("line-aura-prompt")?.classList.add("is-active");
            document.getElementById("line-aura-syntax")?.classList.add("is-active");
          }
        },
        {
          delay: 2500,
          action: () => {
            document.getElementById("node-aura")?.classList.remove("is-active-pulse");
            simStatus.textContent = "PROMPT entwirft Branding | SYNTAX baut Code...";
            document.getElementById("node-prompt")?.classList.add("is-active-pulse");
            document.getElementById("node-syntax")?.classList.add("is-active-pulse");
            document.getElementById("line-prompt-syntax")?.classList.add("is-active");
          }
        },
        {
          delay: 4500,
          action: () => {
            document.getElementById("node-prompt")?.classList.remove("is-active-pulse");
            document.getElementById("node-syntax")?.classList.remove("is-active-pulse");
            simStatus.textContent = "SYNTAX & PROMPT senden Arbeitsstand an VERIFY...";
            document.getElementById("line-prompt-verify")?.classList.add("is-active");
            document.getElementById("line-syntax-verify")?.classList.add("is-active");
          }
        },
        {
          delay: 5800,
          action: () => {
            simStatus.textContent = "VERIFY prüft Syntax, Links, Bilder & SEO-Metadaten...";
            document.getElementById("node-verify")?.classList.add("is-active-pulse");
          }
        },
        {
          delay: 7500,
          action: () => {
            document.getElementById("node-verify")?.classList.remove("is-active-pulse");
            simStatus.textContent = "Prüfung erfolgreich! Freigabe an METRIC...";
            document.getElementById("line-verify-metric")?.classList.add("is-active");
          }
        },
        {
          delay: 8500,
          action: () => {
            simStatus.textContent = "METRIC schaltet Kampagne live & startet A/B-Testing...";
            document.getElementById("node-metric")?.classList.add("is-active-pulse");
          }
        },
        {
          delay: 10500,
          action: () => {
            document.getElementById("node-metric")?.classList.remove("is-active-pulse");
            simStatus.textContent = "Kampagne live! +312% ROAS generiert. Schwarm bereit. ⚡";
            
            // Clean up lines
            lines.forEach(l => l.classList.remove("is-active"));
            
            // Highlight success state
            isRunning = false;
            btnSimulate.disabled = false;
            btnSimulate.textContent = "Erneut simulieren ⚡";
          }
        }
      ];

      steps.forEach(step => {
        setTimeout(step.action, step.delay);
      });
    });
  }

  // --- SPECIALIST SWARM COMPONENT LOGIC ---
  const tabContainer = document.querySelector(".department-tabs");
  const gridContainer = document.getElementById("specialist-swarm-grid");

  if (tabContainer && gridContainer) {
    const tabs = tabContainer.querySelectorAll(".department-tab");

    function renderDepartment(deptKey) {
      const agents = SPECIALIST_DATA[deptKey] || [];
      gridContainer.innerHTML = "";

      agents.forEach(agent => {
        // Create card element
        const card = document.createElement("button");
        card.type = "button";
        card.className = "specialist-card";
        card.setAttribute("data-agent-id", agent.id);

        card.innerHTML = `
          <div class="specialist-card__avatar">${agent.name}</div>
          <div class="specialist-card__content">
            <h4 class="specialist-card__title">${agent.name}</h4>
            <p class="specialist-card__role">${agent.role}</p>
          </div>
        `;

        // Click event on specialist card
        card.addEventListener("click", () => {
          // Clear active core nodes and other specialist cards
          nodes.forEach(n => n.classList.remove("is-selected"));
          gridContainer.querySelectorAll(".specialist-card").forEach(c => c.classList.remove("is-selected"));
          
          card.classList.add("is-selected");

          // Display data in unified details panel
          displayAgentDetails({
            name: agent.name,
            role: agent.role,
            model: agent.model,
            tools: agent.tools,
            prompt: agent.prompt
          });

          // Scroll detail panel into view smoothly
          document.getElementById("workflow-details-panel")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });

        gridContainer.appendChild(card);
      });
    }

    // Set up tab click listeners
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("is-active"));
        tab.classList.add("is-active");

        const dept = tab.getAttribute("data-dept");
        renderDepartment(dept);
      });
    });

    // Render first department by default
    const activeTab = tabContainer.querySelector(".department-tab.is-active");
    if (activeTab) {
      renderDepartment(activeTab.getAttribute("data-dept"));
    }
  }
}
