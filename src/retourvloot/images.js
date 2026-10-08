// Rijksmuseum images (public domain, CC0)
const EVENT_IMAGES = {
 "founding": {
  "src": "img/founding.jpg",
  "title": "The East India House in Amsterdam ('T Oost Indisch Huys)",
  "maker": "possibly Jacob van Meurs",
  "date": "1663",
  "obj": "RP-P-OB-102.062",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-102.062"
 },
 "lemaire": {
  "src": "img/lemaire.jpg",
  "title": "Byrsa Amsterodamensis: Courtyard of Hendrick de Keyser's Exchange in Amsterdam",
  "maker": "Boëtius Adamsz. Bolswert",
  "date": "1609",
  "obj": "RP-P-OB-67.487",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-67.487"
 },
 "firstdiv": {
  "src": "img/firstdiv.jpg",
  "title": "Nutmeg of the Banda Islands, 1599",
  "maker": "Anonymous (Northern Netherlands)",
  "date": "1619",
  "obj": "RP-P-OB-75.396",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-75.396"
 },
 "brouwer": {
  "src": "img/brouwer.jpg",
  "title": "The Return to Amsterdam of the Second Expedition to the East Indies",
  "maker": "Hendrick Cornelisz Vroom",
  "date": "1599",
  "obj": "SK-A-2858",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-2858"
 },
 "batavia": {
  "src": "img/batavia.jpg",
  "title": "The Castle of Batavia",
  "maker": "Andries Beeckman",
  "date": "c. 1662",
  "obj": "SK-A-19",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-19"
 },
 "banda": {
  "src": "img/banda.jpg",
  "title": "View of Banda Neira, Moluccas",
  "maker": "Workshop of Johannes Vingboons",
  "date": "c. 1662-1663",
  "obj": "SK-A-4476",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-4476"
 },
 "revolt": {
  "src": "img/revolt.jpg",
  "title": "Portrait of Johan de Reus, Director of the Rotterdam Chamber of the Dutch East India Company, elected 1657",
  "maker": "Pieter van der Werff",
  "date": "1695-1722",
  "obj": "SK-A-4505",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-4505"
 },
 "amboyna": {
  "src": "img/amboyna.jpg",
  "title": "Bird's-eye View of Ambon, with a Portrait of Frederik Houtman in a Cartouche",
  "maker": "Anonymous",
  "date": "c. 1617",
  "obj": "SK-A-4482",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-4482"
 },
 "hongi": {
  "src": "img/hongi.jpg",
  "title": "Cinnamon, Nutmeg, Clove and Bamboo (Les Indes Orientales et Occidentales)",
  "maker": "Romeyn de Hooghe (publisher Pieter van der Aa)",
  "date": "1682-1733",
  "obj": "BI-1972-1043-16",
  "page": "https://www.rijksmuseum.nl/en/collection/BI-1972-1043-16"
 },
 "makassar": {
  "src": "img/makassar.jpg",
  "title": "Portrait of Cornelis Speelman, Governor-General of the Dutch East Indies",
  "maker": "attributed to Martin Palin",
  "date": "1680-1700",
  "obj": "SK-A-3767",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-3767"
 },
 "bantam1682": {
  "src": "img/bantam1682.jpg",
  "title": "View of the City of Bantam",
  "maker": "Pieter Serwouters, after Pieter Sibrantsz.",
  "date": "1614-1622",
  "obj": "RP-P-1886-A-11180",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-1886-A-11180"
 },
 "kermis": {
  "src": "img/kermis.jpg",
  "title": "East Indiamen off a Coast",
  "maker": "Hendrick Cornelisz Vroom",
  "date": "c. 1600-1630",
  "obj": "SK-A-3108",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-3108"
 },
 "dejima": {
  "src": "img/dejima.jpg",
  "title": "Nagasaki Bay",
  "maker": "Workshop of Kawahara Keiga",
  "date": "c. 1833-1836",
  "obj": "NG-1190",
  "page": "https://www.rijksmuseum.nl/en/collection/NG-1190"
 },
 "cape": {
  "src": "img/cape.jpg",
  "title": "The Cape of Good Hope",
  "maker": "Anonymous (England), after Jan van Ryne; publ. Robert Sayer",
  "date": "1754",
  "obj": "RP-P-1932-480",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-1932-480"
 },
 "formosa": {
  "src": "img/formosa.jpg",
  "title": "Capture of Fort Zeelandia on Formosa by the Chinese (Koxinga) and the martyrdom of the Reformed ministers, 1661",
  "maker": "attributed to Crispijn van de Passe (II)",
  "date": "1662-1663",
  "obj": "RP-P-OB-47.421",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-47.421"
 },
 "silverban": {
  "src": "img/silverban.jpg",
  "title": "Foreign Ships in the Harbour of Nagasaki",
  "maker": "Anonymous (Japan), publ. Bunkindo, Nagasaki",
  "date": "1800-1850",
  "obj": "RP-P-1956-461",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-1956-461"
 },
 "rampjaar": {
  "src": "img/rampjaar.jpg",
  "title": "Allegory on the French Invasion of 1672",
  "maker": "Johannes van Wijckersloot",
  "date": "1672",
  "obj": "SK-A-4910",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-4910"
 },
 "coffee": {
  "src": "img/coffee.jpg",
  "title": "Arabian Coffee Plant",
  "maker": "Laurens Vincentsz. van der Vinne",
  "date": "1668-1729",
  "obj": "RP-T-2013-58-25",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-T-2013-58-25"
 },
 "bubble": {
  "src": "img/bubble.jpg",
  "title": "Title print for Het Groote Tafereel der Dwaasheid (The Great Mirror of Folly): the Share Shop of the Paper World",
  "maker": "Jacob Folkema, after Arnold Houbraken",
  "date": "1720",
  "obj": "RP-P-AO-28-59-1",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-AO-28-59-1"
 },
 "canton": {
  "src": "img/canton.jpg",
  "title": "View of Canton, China",
  "maker": "Workshop of Johannes Vingboons (anonymous)",
  "date": "c. 1662-1663",
  "obj": "SK-A-4474",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-4474"
 },
 "malaria": {
  "src": "img/malaria.jpg",
  "title": "View of the Town Hall and the New Dutch Church in Batavia",
  "maker": "Franz Xaver Habermann (publ. Kaiserlich Franziskische Akademie, Augsburg)",
  "date": "1755-1779",
  "obj": "RP-P-OB-47.415",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-47.415"
 },
 "geger": {
  "src": "img/geger.jpg",
  "title": "Massacre of the Chinese in Batavia, 1740",
  "maker": "Adolf van der Laan",
  "date": "1740",
  "obj": "RP-P-OB-75.355",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-75.355"
 },
 "war4": {
  "src": "img/war4.jpg",
  "title": "Battle of Dogger Bank, 5 August 1781",
  "maker": "Cornelis Bogerts",
  "date": "1781-1783",
  "obj": "RP-P-BI-1956",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-BI-1956"
 },
 "stateaid": {
  "src": "img/stateaid.jpg",
  "title": "Drill of the Amsterdam Citizenry in the Presence of Baron van der Capellen tot den Pol, 1783",
  "maker": "Simon Fokke",
  "date": "1783-1784",
  "obj": "RP-P-OB-77.549",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-77.549"
 },
 "batavian": {
  "src": "img/batavian.jpg",
  "title": "Festival of Liberty on Dam Square, Amsterdam, 4 March 1795 (inauguration of the Liberty Tree)",
  "maker": "Reinier Vinkeles (I) and Daniël Vrijdag, after Jacques Kuyper",
  "date": "1795",
  "obj": "RP-P-OB-77.568",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-77.568"
 },
 "nationalised": {
  "src": "img/nationalised.jpg",
  "title": "View of the Dolhuis and the Gate to the East India House on the Kloveniersburgwal, Amsterdam",
  "maker": "possibly Hermanus Petrus Schouten (publ. Pierre Fouquet)",
  "date": "c. 1770-1783",
  "obj": "RP-P-AO-25-63A",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-AO-25-63A"
 },
 "pamphlets": {
  "src": "img/pamphlets.jpg",
  "title": "The Town Hall on Dam Square, Amsterdam",
  "maker": "Gerrit Berckheyde",
  "date": "1672",
  "obj": "SK-A-34",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-34"
 },
 "deathship": {
  "src": "img/deathship.jpg",
  "title": "Warships in a Heavy Storm",
  "maker": "Ludolf Bakhuysen",
  "date": "c. 1695",
  "obj": "SK-A-4856",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-4856"
 },
 "batavia1629": {
  "src": "img/batavia1629.jpg",
  "title": "Hamburg Taler of Emperor Ferdinand II, Recovered from the Wreck of the VOC Ship Batavia",
  "maker": "Anonymous (Hamburg mint)",
  "date": "1621",
  "obj": "NG-538",
  "page": "https://www.rijksmuseum.nl/en/collection/NG-538"
 },
 "mutiny": {
  "src": "img/mutiny.jpg",
  "title": "The Keelhauling of the Ship's Surgeon of Admiral Jan van Nes",
  "maker": "Lieve Verschuier",
  "date": "c. 1660-1686",
  "obj": "SK-A-449",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-449"
 },
 "silverplea": {
  "src": "img/silverplea.jpg",
  "title": "Silver Netherlands Rijksdaalder of West-Friesland, 1619",
  "maker": "Landschap West-Friesland (mint)",
  "date": "1619",
  "obj": "KOG-MP-1-1719",
  "page": "https://www.rijksmuseum.nl/en/collection/KOG-MP-1-1719"
 },
 "idlesilver": {
  "src": "img/idlesilver.jpg",
  "title": "The Castle of Batavia",
  "maker": "Wenceslaus Hollar",
  "date": "1669",
  "obj": "RP-P-1906-178",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-1906-178"
 },
 "corruption": {
  "src": "img/corruption.jpg",
  "title": "Portrait of Petrus Albertus van der Parra, Governor-General of the Dutch East India Company",
  "maker": "Anonymous",
  "date": "c. 1762",
  "obj": "SK-A-3782",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-3782"
 },
 "glut": {
  "src": "img/glut.jpg",
  "title": "The East India Company Shipyard and Warehouse in Amsterdam, Seen from the IJ",
  "maker": "Jan Spaan",
  "date": "c. 1757-1828",
  "obj": "RP-P-OB-59.755",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-59.755"
 },
 "convoys": {
  "src": "img/convoys.jpg",
  "title": "The Failed English Attack on the Dutch Return Fleet in the Port of Bergen, Norway, 12 August 1665",
  "maker": "Willem van de Velde the Elder",
  "date": "1669",
  "obj": "SK-A-1384",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-1384"
 },
 "garrison": {
  "src": "img/garrison.jpg",
  "title": "Isaac de l'Ostal de Saint-Martin, Councillor of the Indies and Commander of the Garrison at Batavia",
  "maker": "Attributed to Jan de Baen",
  "date": "c. 1660-1670",
  "obj": "SK-A-4162",
  "page": "https://www.rijksmuseum.nl/en/collection/SK-A-4162"
 },
 "sugar": {
  "src": "img/sugar.jpg",
  "title": "Red Sugarcane",
  "maker": "Jan Brandes",
  "date": "1779-1787",
  "obj": "NG-1985-7-1-72",
  "page": "https://www.rijksmuseum.nl/en/collection/NG-1985-7-1-72"
 },
 "capeslaves": {
  "src": "img/capeslaves.jpg",
  "title": "The Strandstraat in Cape Town",
  "maker": "Jan Brandes",
  "date": "1786",
  "obj": "NG-2012-41",
  "page": "https://www.rijksmuseum.nl/en/collection/NG-2012-41"
 },
 "tasman": {
  "src": "img/tasman.jpg",
  "title": "Arrival of Abel Tasman in New Zealand, 1642-1643",
  "maker": "Johann Heinrich Rennefeld, after Everhardus Koster",
  "date": "1865-1870",
  "obj": "BI-1997-1407B-19",
  "page": "https://www.rijksmuseum.nl/en/collection/BI-1997-1407B-19"
 },
 "mataram": {
  "src": "img/mataram.jpg",
  "title": "Siege of Batavia by the King of Java (Mataram), 1628",
  "maker": "C.W. Mieling (lithographer), possibly after Balthasar Florisz. van Berckenrode; publ. Frederik Muller",
  "date": "1857-1859",
  "obj": "RP-P-OB-75.325A",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-75.325A"
 },
 "credit1773": {
  "src": "img/credit1773.jpg",
  "title": "Bankrupt Couple",
  "maker": "Daniel Nikolaus Chodowiecki",
  "date": "1775",
  "obj": "RP-P-OB-13.698",
  "page": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-13.698"
 }
};
