import { Formik, Field, Form } from "formik";
import { useEffect, useState } from "react";
import { getSearchSuggestions } from "../../services/apiServices";
import { FaDeleteLeft, } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import styles from "./SearchInput.module.css";

export default function SearchInput({ onSelect }) {
  const [suggestions, setSuggestions] = useState([]);

  return (
    <Formik
      initialValues={{ search: '' }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.search.trim() !== '') {
          onSelect({ name: values.search });
        }
        setSubmitting(false);
        setSuggestions([]);
      }}
    >
      {({ values, setFieldValue }) => {
        useEffect(() => {
          if (values.search.trim().length > 2) {
            const fetchSuggestions = async () => {
              try {
                const res = await getSearchSuggestions(values.search);
                setSuggestions(res);
              } catch (err) {
                console.error(err);
              }
            };
            fetchSuggestions();
          } else {
            setSuggestions([]);
          }
        }, [values.search]);

        return (
          <Form className={styles.searchForm}>
            <div className={styles.inputContainer}>
              <Field
                name="search"
                placeholder="Search for your location’s weather"
                autoComplete="off"
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => {
                  setFieldValue('search', '');
                  setSuggestions([]);
                }}
                className={styles.clearBtn}
              >
                <FaDeleteLeft />
              </button>
              <button type="submit" className={styles.submitBtn}>
                <FaSearchLocation />
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className={styles.suggestionsList}>
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      onSelect(s);
                      setFieldValue('search', s.name);
                      setSuggestions([]);
                    }}
                    className={styles.suggestionItem}
                  >
                    {s.name}, {s.country}
                  </li>
                ))}
              </ul>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
