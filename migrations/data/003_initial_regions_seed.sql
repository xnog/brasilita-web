-- Seed das 20 regiões oficiais da Itália com exemplos
INSERT INTO region (id, name, examples, "createdAt", "updatedAt") VALUES 
    ('abruzzo', 'Abruzzo', 'L''Aquila, Pescara, Costa Adriática', NOW(), NOW()),
    ('basilicata', 'Basilicata', 'Matera, Potenza, Maratea', NOW(), NOW()),
    ('calabria', 'Calabria', 'Reggio Calabria, Cosenza, Catanzaro', NOW(), NOW()),
    ('campania', 'Campania', 'Nápoles, Amalfi, Sorrento, Capri', NOW(), NOW()),
    ('emilia-romagna', 'Emilia-Romagna', 'Bologna, Parma, Módena, Rimini', NOW(), NOW()),
    ('friuli-venezia-giulia', 'Friuli-Venezia Giulia', 'Trieste, Udine, Pordenone', NOW(), NOW()),
    ('lazio', 'Lazio', 'Roma, Viterbo, Latina', NOW(), NOW()),
    ('liguria', 'Liguria', 'Gênova, Cinque Terre, Portofino', NOW(), NOW()),
    ('lombardia', 'Lombardia', 'Milão, Como, Bergamo, Brescia', NOW(), NOW()),
    ('marche', 'Marche', 'Ancona, Urbino, Ascoli Piceno', NOW(), NOW()),
    ('molise', 'Molise', 'Campobasso, Termoli, Isernia', NOW(), NOW()),
    ('piemonte', 'Piemonte', 'Turim, Alba, Asti, Langhe', NOW(), NOW()),
    ('puglia', 'Puglia', 'Bari, Lecce, Brindisi, Alberobello', NOW(), NOW()),
    ('sardegna', 'Sardegna', 'Cagliari, Sassari, Costa Smeralda', NOW(), NOW()),
    ('sicilia', 'Sicilia', 'Palermo, Catânia, Taormina, Siracusa', NOW(), NOW()),
    ('toscana', 'Toscana', 'Florença, Siena, Pisa, Chianti', NOW(), NOW()),
    ('trentino-alto-adige', 'Trentino-Alto Adige', 'Trento, Bolzano, Merano, Dolomitas', NOW(), NOW()),
    ('umbria', 'Umbria', 'Perugia, Assis, Orvieto', NOW(), NOW()),
    ('valle-d-aosta', 'Valle d''Aosta', 'Aosta, Courmayeur, Cervinia', NOW(), NOW()),
    ('veneto', 'Veneto', 'Veneza, Verona, Pádua, Vicenza', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;