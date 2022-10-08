import { about } from '../../constants'
import './Home.css'

const Home = () => {
  const { name, role, description, resume, social } = about

  return (
    <div class="section-center">
      {name && (
        <h1>
          Hi, wee are <span className='about__name'>{name}.</span>
        </h1>
      )}

      {role && <h2 className='about__role'>A {role}.</h2>}
      <p className='about__desc'>{description && description}</p>

      <div className='about__contact center'>
        {resume && (
          <a href={resume}>
            <span type='button' className='btn btn--outline'>
              Tezos
            </span>
          </a>
        )}

        {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                aria-label='github'
                className='link link--icon'
              >
                {/* <GitHubIcon /> */}
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                aria-label='linkedin'
                className='link link--icon'
              >
                {/* <LinkedInIcon /> */}
              </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home
