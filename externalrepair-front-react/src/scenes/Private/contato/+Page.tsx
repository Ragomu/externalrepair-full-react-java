import MainContentContainer from '~/components/MainContentContainer';
import {
  ContactBlock,
  ContactsPanel,
  ContactsScroll,
  Dept,
  Field,
  Form,
  FormRow,
  Grid,
  Input,
  Label,
  Lead,
  Line,
  Muted,
  Person,
  Pill,
  Pills,
  SectionTitle,
  Submit,
  Tag,
  TextArea,
  Wrapper,
} from './styles';

const ContatoPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada!');
  };

  return (
    <MainContentContainer actionArea={false} userName="">
      <Wrapper>
        <Grid>
          <section>
            <SectionTitle>
              Entre em contato
              <br />
              conosco
            </SectionTitle>
            <Lead>Preencha o formulário e faça contato com o nosso time!</Lead>

            <Form onSubmit={handleSubmit}>
              <FormRow>
                <Field>
                  <Label>Primeiro nome</Label>
                  <Input placeholder="Primeiro nome" />
                </Field>
                <Field>
                  <Label>Último nome</Label>
                  <Input placeholder="Último nome" />
                </Field>
              </FormRow>

              <Field>
                <Label>E-mail</Label>
                <Input type="email" placeholder="E-mail" />
              </Field>

              <Field>
                <Label>Número de telefone</Label>
                <Input type="tel" placeholder="(55) 65 99999-9999" />
              </Field>

              <Field>
                <Label>Mensagem</Label>
                <TextArea placeholder="Digite sua mensagem..." />
              </Field>

              <Submit type="submit">
                Enviar <span className="material-symbols-outlined">send</span>
              </Submit>
            </Form>
          </section>

          <section>
            <SectionTitle as="h2">Contatos</SectionTitle>
            <Pills>
              <Pill $active>Todos</Pill>
              <Pill>Almoxarifado</Pill>
              <Pill>Logística</Pill>
              <Pill>Fiscal</Pill>
            </Pills>
            <Tag>PCM – Planejamento e Controle da Manutenção</Tag>

            <ContactsPanel style={{ marginTop: 12 }}>
              <ContactsScroll>
                <ContactBlock>
                  <Dept>Almoxarifado</Dept>
                  <Muted>
                    Setor responsável pelo armazenamento, controle e
                    distribuição de materiais, insumos e produtos utilizados nas
                    atividades da organização.
                  </Muted>
                  <Person>André Ferreira</Person>
                  <Line>Telefone corporativo | (55) 65 99999-9999</Line>
                  <Line>E-mail | andre.ferreira@uisa.com.br</Line>

                  <Person>André Ferreira</Person>
                  <Line>Telefone corporativo | (55) 65 99999-9999</Line>
                  <Line>E-mail | andre.ferreira@uisa.com.br</Line>
                </ContactBlock>

                <ContactBlock>
                  <Dept>Logística</Dept>
                  <Person>André Ferreira</Person>
                  <Line>Telefone corporativo | (55) 65 99999-9999</Line>
                  <Line>E-mail | andre.ferreira@uisa.com.br</Line>
                </ContactBlock>
              </ContactsScroll>
            </ContactsPanel>
          </section>
        </Grid>
      </Wrapper>
    </MainContentContainer>
  );
};

export default ContatoPage;
