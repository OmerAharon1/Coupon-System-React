import "./About.css";
import * as yup from "yup";


function About(): JSX.Element {
    return (
        <div className="About">
            <article>
                <h1>About</h1>
                <h3>preposition</h3>
                <p>of; concerning; in regard to:
                    instructions about the work;</p>
                <p>a book about the Civil War.
                    connected or associated with:
                    There was an air of mystery about him.</p>

                <h3>adverb</h3>
                <p>near in time, number, degree, etc.; approximately:
                    It's about five miles from here.
                </p>
                <p>nearly; almost ,Dinner is about ready.
                </p>

                <h3>adjective</h3>
                <p>moving around; astir:
                He was up and about while the rest of us still slept.</p>
                <p>in existence; current; prevalent:
                Chicken pox is about.</p>
                
            </article>
        </div>
    );
}

export default About;
