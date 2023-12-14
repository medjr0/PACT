INSERT INTO user(name, mail, psw, role) VALUES ('Quentin', 'quentin.buzet@telecom-paris.fr', 'test1234', 'Admin');
INSERT INTO user(name, mail, psw, role) VALUES ('Mohamed', 'mohamed.jarmouni@telecom-paris.fr', 'test1234', 'Admin');
#UPDATE user SET psw='test1234', role='Admin';

INSERT INTO association(name, phone, address, mail, website) VALUES ('Singa', '0140610624', '50 rue de Montreuil 75011 PARIS', 'contact@singa.fr', 'https://singafrance.com/');
INSERT INTO user(name, mail, psw, role, association_id) VALUES ('Singa', 'contact@singa.org', 'SINGAGA', 'Association', 
    (SELECT id FROM association WHERE name='Singa'));
INSERT INTO service(title, logo, description, association_id, isApproved, price) 
    VALUES('Programme Entreprendre', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fn3xtcoder.org%2Fmedia%2Fsinga-logo.jpg&f=1&nofb=1', 
    'The entrepreneurship programme at SINGA uses cultural diversity and new encounters as driving forces behind creation and innovation. At Lille, Lyon, Nantes, Paris and Strasbourg, we support newcomers and locals together to grow and develop associations that are creative, impactful and thriving.',
    (SELECT id FROM association WHERE name='Singa'), 0, 0);

INSERT INTO lang (lang) VALUES ('Français'), ('English');

