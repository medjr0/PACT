-- Lister les différents services 
SELECT *, AVG(rating)
FROM service AS s JOIN Note AS n ON s.service_id=n.service_id
GROUP BY service_id

-- Récupérer un service précis
SELECT *
FROM service AS s JOIN service_category AS sc ON s.service_id=sc.service_id JOIN category AS c ON sc.category_id = c.category_id JOIN service_type AS st ON s.service_id=st.service_id JOIN type AS t ON st.type_id = t.type_id JOIN service_lang AS sl ON s.service_id=sl.service_id JOIN lang AS l ON sl.type_id = l.type_id
WHERE service_id = x

-- Récupérer les informations d’une association associé à un service
SELECT association_id, phone, adress, mail, website 
FROM service AS s JOIN association AS a ON s.association_id = a.association_id
WHERE service_id = x

-- Afficher les questions des utilisateurs
SELECT *
FROM service AS s JOIN question AS q ON s.service_id=q.service_id
WHERE service_id = x

-- Afficher les réponses à une question précise
SELECT *
FROM question AS q JOIN answer AS a ON q.question_id = a.question_id
WHERE question_id = x

-- Une association s’enregistre pour la première fois
INSERT INTO association
VALUES (name, phone, adress, mail, website)
INSERT INTO user
VALUES (name, mail, psw, 'association', SELECT association_id FROM association WHERE mail=x)

-- Une association ajoute un service dans la base de données
INSERT INTO service
VALUES (title, logo, description, SELECT association_id FROM association WHERE mail=x, 'No', price, planning, tutorial)

-- Un admin ajoute un modérateur
INSERT INTO user
VALUES (name, mail, psw, 'moderator', 0)

-- Un admin supprime un modérateur ou un utilisateur
DELETE FROM user
WHERE mail = x

-- Un modérateur valide un service
UPDATE service
SET isApproved = 'yes'
WHERE service_id = id

-- Un modérateur ou une association modifie un service
UPDATE service
SET title = x, logo = y description=z, isApproved = w, price = p, planning = l, tutoriel = t
WHERE service_id = id

-- Un modérateur supprimer un service
DELETE FROM service
WHERE service_id = id

-- Une association modifie ses informations
UPDATE association
SET name = x, phone = y, adress = z, mail = w, website = v 
WHERE association_id = id

-- Une association modifie un service
UPDATE service
SET title = x, logo = y description=z, isApproved = w, price = p, planning = l, tutoriel = t
WHERE service_id = id

-- Une personne dans le besoin pose une question 
INSERT INTO question
VALUES (service_id, user_key, question, NOW())

-- Une association ou personne dans le besoin répond à une question
INSERT INTO answer
VALUES (question_id, user_key, answer, NOW())

-- Une personne dans le besoin ajoute une note
INSERT INTO rating
VALUES (service_id, user_key, rating)

-- Permettre la connexion d’un utilisateur (association, modérateur, admin)
SELECT *
FROM user
WHERE mail = x AND psw = y --mot de passe hashé

-- Récupérer le rôle d’un utilisateur
SELECT role
FROM user


