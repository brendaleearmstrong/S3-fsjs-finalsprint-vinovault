-- Trigger function to update DateReviewed on review update
CREATE OR REPLACE FUNCTION update_date_reviewed()
RETURNS TRIGGER AS $$
BEGIN
    NEW.DateReviewed = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update DateReviewed before update on Reviews
CREATE TRIGGER update_date_reviewed_trigger
BEFORE UPDATE ON Reviews
FOR EACH ROW
EXECUTE FUNCTION update_date_reviewed();

-- Trigger function to enforce rating constraints
CREATE OR REPLACE FUNCTION enforce_rating_constraints()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Rating < 1 OR NEW.Rating > 5 THEN
        RAISE EXCEPTION 'Rating must be between 1 and 5';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to enforce rating constraints before insert or update on Reviews
CREATE TRIGGER enforce_rating_constraints_trigger
BEFORE INSERT OR UPDATE ON Reviews
FOR EACH ROW
EXECUTE FUNCTION enforce_rating_constraints();
