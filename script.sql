CREATE TABLE IF NOT EXISTS public.users
(
    id bigserial NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying(256) NOT NULL,
    picture character varying,
    description text,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.products
(
    id bigserial NOT NULL,
    name character varying NOT NULL,
    description text,
    category integer NOT NULL,
    brand character varying NOT NULL,
    price money,
    pictures character varying[] NOT NULL,
    add_date date NOT NULL,
    sold boolean,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.orders
(
    id bigserial NOT NULL,
    user_id bigint NOT NULL,
    product_id bigint NOT NULL,
    delievery_adress character varying NOT NULL,
    payment_method integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.favourites
(
    id bigserial NOT NULL,
    product_id bigint NOT NULL,
    user_id bigint NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.categories
(
    id serial NOT NULL,
    name character varying NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.payment_methods
(
    id serial NOT NULL,
    name character varying NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.reviews
(
    id bigserial NOT NULL,
    rating numeric NOT NULL,
    user_id bigint NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.products
    ADD FOREIGN KEY (category)
    REFERENCES public.categories (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.orders
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.orders
    ADD FOREIGN KEY (product_id)
    REFERENCES public.products (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.orders
    ADD FOREIGN KEY (payment_method)
    REFERENCES public.payment_methods (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.favourites
    ADD FOREIGN KEY (product_id)
    REFERENCES public.products (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.favourites
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.reviews
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;