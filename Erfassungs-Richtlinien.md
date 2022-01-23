# Erfassungs-Richtlinien web-Hering
Für alle, die den Inhalt anpassen möchten – und sollen

Wir haben mit [Strapi](https://hering-api.herokuapp.com/admin/) \[:schtrapi:\]? den Inhalt in den digitaleren Hering abgefüllt. Dafür wird ein Login verwendet, das unter *Settings* &rarr; *Users* auch neuen Personen vergeben werden kann. Wenn es gerade nicht verwendet wird, geht Strapi in den wohlverdienten Schlaf und braucht dann etwas Geduld, bis es aufgeweckt und bereit ist – dies betrifft vor allem die Testumgebung.

## Gesamt-Aufbau
Grundsätzlich ist der Aufbau weitgehend selbsterklärend, wenn man sich mal durch alle Menü-Punkte durchklickt – möglichst ohne bereits gross etwas zu verändern. Dafür ist wichtig zu wissen, dass es die übergeordneten *Sections* mit den *Chapters* darunter gibt. Weitere relevante Details werden untenstehend beschrieben. Man beachte, dass man sich die jeweiligen Listen-Darstellungen mit *Configure the view* über das Einstellungs-Symbol selbst zusammenstellen kann. Einzelne Einträge können jeweils unter *Internalization* einer Sprache (*Locales*) zugeswiesen werden.

### StartPage
Dabei handelt es sich um die Einstiegsseite. *Content* wird jeweils in MarkDown ([Anleitung unten](#Markdown-Tipps)) editiert.

### Sections
Die *Sections* sind die übergeordneten Einheiten, in die der Hering gegliedert ist. Sie bestehen aus einem *Title* (steht oben am Text in der Seite) und einem *Menu_name* (wo könnte dieser bloss stehen...?), sowie faktultativem Content, der vor dem ersten Chapter eingefügt werden kann. Der *Slug* kann – einmal generiert – nicht mehr angepasst werden und kommt in der URL zu liegen. Einer *Section* können mehrere Chapters zugeteilt werden.

### Chapters
Analog zur *Section* hat ein Chapter einen *Title*, *Menu_name* und *Content*. Der *Slug* wird direkt mit demjenigen der *Section* zusammengefügt, damit eine sprechende URL erzeugt werden kann. Unter *Responsible* wird angegeben, welche Rolle(n) das Chapter betrifft. Zu einem Chapter können eine *Section* und mehrere *Tasks* zugeordnet werden.
Die Sorting-Werte wurden folgendermassen aufgesetzt:
- A. à 101, 102…
- B. à 201, 202…  
Das hilft uns – sofern sauber gehalten – nachhaltig beim Überblick.

### Links
Ein Link hat einen *Title*, der nur unserer Übersicht dient und einen *Key*, der in den verschiedenen Sprachen derselbe und unverändert bleibt. Damit kann man auf einen *Link* **oder** ein internes *Chapter* verweisen. Alle diese Angaben müssen eindeutig sein und dürfen nicht in verschiedenen Links verwendet werden.
Das mag etwas kompliziert klingen, macht aber durchaus Sinn, wenn sich ein Link ändert, da dieser dann mit Sicherheit nur an einem Ort angepasst werden muss.

### Media-Library
Hier können *Assets* (also Bilder) hochgeladen und sortiert/gefiltert werden.

### Tasks
*Tasks* sind Aufgaben, die im Kalender mit der entsprechenden Frist eingetragen werden. `-50` heisst beispielsweise, dass die Frist 50 Tage vor dem Lager ist. Dazu wird jeweils eine oder mehrere verantwortliche Rollen (*Responsible*) und ein Kapitel, auf das zur Erklärung verlinkt wird, erfasst.
Da sich die Daten nicht genau definieren lassen und wir diese Kapitel eher als Tipps und Tricks statt als ToDos ansehen, haben wir nicht zu allen *Chapters* einen *Task* erfasst (insbesondere Voilà, eCamp, Faires Lager) Längerfristig besteht die Möglichkeit, «nice to have»-*Tasks* einzubauen, damit man für den Export wählen kann, ob man sie auch einschliessen möchte.

### Users
Dieser Menüpunkt kam automatisch mit, stört nicht, bringt aber auch nichts. Er ist nicht mit *Settings* &rarr; *Users* zu verwechseln, dort kann man die Rollen der Beitragenden managen.

### CalendarPage
Hier kann der Text vor dem Zusammenstellen der Aufgabenliste (=Kalender) bearbeitet werden.

### ImpressumPage
Die ist offensichtlich zur Bearbeitung des Impressums.

### Content-Types Builder
Hier empfehlen wir (Tschagon und Appendix), nicht herumzuspielen, ausser du sprichst dich mit Folletta ab und machst es bewusst – oder folgst einer allfälligen Anleitung, die sie hier noch ergänzen könnte ;)
Irgendwo in diesem Bereich werden auch die Bezeichnungen LL (Lagerleiter\*in) / AL (Abteilungsleiter\*in) / C (Coach) vergeben.

## Markdown-Tipps
Im Texteditor wird der Text nicht genau so, wie man ihn anschliessend sieht eingefüllt. Deshalb ist es wichtig, dass man nach Anpassungen schaut, ob sie auch chic aussehen. Einiges kann auch niederschwellig über die Buttons oben im Texteditor eingefügt werden. Schau dir am besten die anderen Seiten etwas an und trau dich auch zu googeln (2022 war das ein Synonym für im Internet suchen), wenn du nicht auf Anhieb weiter weisst. Sollte es dann immer noch nicht klappen, musst du wohl deine Ansprüche ans Layout runterfahren, denn Markdown ist nicht besonders kompliziert – aber dennoch genau richtig für unsere Anwendung.

### Schriftart
- *kursiver Text* wird mit `*einem Stern darum*` gekennzeichent
- **fetter Text** wird mit `**zwei Sternen darum**` gekennzeichent

### einzelne Zeichen
- Um den\*die Genderstern zu schreiben, wird dem Stern ein Backslash vorangestellt: `Leiter\*in`
- Ein Rechtspfeil (&rarr;) wird mit `&rarr;` erstellt
- Ein geschütztes Leerzeichen wird mit `&nbsp;`erstellt. Dieses kann beispielsweise in der französischen Version zwischen die Anführungszeichen und den Text gestellt werden, damit dort nicht umgebrochen wird. z. B. `«&nbsp;je vais couper la sardine en petit morceaux&nbsp;»`

### Achtung-Kasten im Markdown
Um einen Textblock hervorzuheben, wird ein \> vorangestellt.  
`>so einfach ist ein Abschnitt wichtiger als andere.`  
Um innerhalb eines Blocks einen Zeilenumbruch einzufügen, beendet man die vorangehende Zeile mit zwei Leerzeichen.

### Untertitel
Die bereits vorhandenen Titel sind auf Niveau *Heading1* (*Section*) und *Heading2* (*Chapter*). Um innerhalb eines *Chapters* Untertitel einzufügen, werden diesem drei Rautezeichen (*Heading3*) und ein Leerschlag vorangestellt:
`### Heading3`

### Aufzählungen
- können mit `- Bulletpoint`
- geschrieben werden
1. oder mit `1. Aufzählung`
2. mit Zahlen

### Markdown-Links
Um den «Text» auf den Key «Schluessel» zu verlinken, wird folgende Syntax verwendet:
`[Text]($Schluessel$)`  
Der Schlüssel innerhalb der Dollar-Zeichen ist der, den wir oben unter [Links](#Links) zugeordnet haben.

### Tabellen
Wenn du dir das wirklich antun willst, dann hilft dir beispielsweise der https://www.tablesgenerator.com/markdown_tables

### Bilder
Um ein Bild einzufügen, muss es zuerst in der Media-Library abgelegt werden. Dann kann man es über das entsprechende Symbol oder mit folgender Syntax einbinden:
- Bild gemäss Bildbreite, aber maximal in der Fensterbreite (standardmässig)  
`![B2b Vorgaben JS.svg](https://res.cloudinary.com/dxxcsbqpy/image/upload/v1642946526/hering/B2b_Vorgaben_JS_cc87a23350.svg)`
- Bild mit fixer Breite (hier 50px) und verhältnismässig angepasster Höhe  
`![alt: de-Lagerdaten\_Coach\_MiDataA.png, width: 50]
(https://res.cloudinary.com/dxxcsbqpy/image/upload/v1642453538/hering/Lagerdaten\_Coach\_Mi\_Data\_A\_b3b32a88d3.png)`
- Bild mit definierter Breite und Höhe (evtl. verzogen)  
`![alt: de-Lagerdaten\_Coach\_MiDataA.png, size: 50x70](https://res.cloudinary.com/dxxcsbqpy/image/upload/v1642453538/hering/Lagerdaten\_Coach\_Mi\_Data\_A\_b3b32a88d3.png)`
In der \[eckigen Klammer\] steht jeweils mindestens der «Alt-Text» (alternativ, falls kein Bild angezeigt werden kann, barrierefrei), evtl. aber auch noch Masse. In der (runden Klammer) der Link, von wo das Bild geladen werden soll.
