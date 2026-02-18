# Technical Specification: Condo Rating Oracle Replication Guide

**Project Name:** Condo Rating Oracle  
**Role:** Technical Analyst  
**Objective:** Provide a comprehensive blueprint for replicating the apartment scoring logic and user interface in a new project.

---

## 1. Overview
The "Condo Rating Oracle" is a diagnostic tool used to assess the "health" or "rating" of a condominium based on 12 specific criteria. Users provide a numeric input (Voto) for each criterion, which is then weighted and averaged to produce a final score and an alphanumeric grade.

## 2. Data Model
The core of the application is an array of objects representing the assessment criteria.

### Criterion Object Structure:
| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | Number | Unique identifier. |
| `domanda` | String | The title of the criterion. |
| `description`| String | A detailed explanation of the criterion. |
| `peso` | Number | The multiplier weight for this specific question. |
| `voto` | Number | User input (the "grade" given by the analyst). |
| `punteggio` | Number | Calculated value: `peso * voto`. |
| `tooltipData`| Array | Mapping guidelines (Label -> Voto) to help the user choose the correct input. |

---

## 3. Assessment Criteria (The 12 Rows)
Below are the exact values used in the prototype:

| ID | Criterion (Domanda) | Weight (Peso) | Input Guidelines (Example mappings) |
| :--- | :--- | :--- | :--- |
| 1 | Percentuale proprietari/affittuari | 1.0 | 100% -> 1; <25% -> 5 |
| 2 | Grandezza condominio | 1.0 | ≤8 units -> 2; 9-60 -> 4; >60 -> 2 |
| 3 | Zona di riferimento | 1.0 | Degradata -> 2; Normale -> 3; Lusso -> 5 |
| 4 | Ceto dei proprietari | 1.0 | Basso -> 2; Medio -> 3; Alto -> 4 |
| 5 | Andamento dei bilanci | 1.5 | >20% deficit -> -5; <0% -> 4 |
| 6 | Presenza decreti ingiuntivi | 1.5 | Sì -> -5; No -> 3 |
| 7 | % morosità condomini | 2.0 | >20% -> -5; 0-5% -> 3 |
| 8 | Risparmio per lavoro svolto | 1.5 | 0-5% -> 0; >50% -> 5 |
| 9 | Valore medio mq | 1.0 | <1500€ -> 1; ≥8000€ -> 5 |
| 10| Classe energetica POST | 1.0 | A -> 5; G -> 0 |
| 11| Quota spesa condòmino | 1.0 | >20k€ -> 2; ≤20k€ -> 4 |
| 12| Spesa riscaldamento annua | 1.0 | <500€ -> 2; >2000€ -> 4 |

---

## 4. Calculation Formulas

### A. Individual Row Score (`punteggio`)
For each row `i`:
$$punteggio_i = peso_i 	imes voto_i$$

### B. Final Total Score (`punteggioTotale`)
The final score is the **arithmetic mean** of all row scores:
$$punteggioTotale = \frac{\sum_{i=1}^{n} punteggio_i}{n}$$
*Where `n` is the total number of criteria (12).*

---

## 5. Grading and Visualization Logic
The numeric `punteggioTotale` is mapped to an alphanumeric index and a specific color scheme:

| Score Range | Grade (Indice) | UI Color (Tailwind) |
| :--- | :--- | :--- |
| ≥ 4.00 | **A1** | `bg-green-500` |
| 2.91 - 3.99 | **A2** | `bg-green-300` |
| 1.91 - 2.90 | **B1** | `bg-yellow-400` |
| 1.21 - 1.90 | **B2** | `bg-orange-400` |
| < 1.21 | **C** | `bg-red-500` |

---

## 6. UI/UX Requirements
1.  **Header:** Input field for "ID Condominio" (Required).
2.  **Table Structure:**
    *   Column 1: Criterion Name + Tooltip (Information icon showing the Guidelines).
    *   Column 2: Weight (Static badge).
    *   Column 3: Input Field (Numeric, recommended step 0.1).
    *   Column 4: Row Result (Read-only, calculated in real-time).
3.  **Result Card:** A summary card at the bottom that remains hidden or "blurred" until all 12 inputs are provided.
4.  **Export:** A "Save" button that generates a JSON file containing the ID, the final score, the grade, and the detailed list of criteria.

## 7. Technical Stack (Implementation Reference)
*   **Framework:** React (TypeScript).
*   **State Management:** `useState` hook for the list of criteria.
*   **Styling:** Tailwind CSS.
*   **Components:** Radix UI / Shadcn UI (Table, Card, Tooltip, Input, Button).
*   **Icons:** Lucide-react (Info, Calculator, Save).
