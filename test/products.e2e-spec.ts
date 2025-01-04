import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (GET)', async () => {
    const result = await request.default(app.getHttpServer()).get('/products');

    expect(result.status).toBe(200);

    expect(result.body).toBeInstanceOf(Array);
  });

  it('/products/:999999 (GET) should return null', async () => {
    const result = await request
      .default(app.getHttpServer())
      .get('/products/999999');

    expect(result.status).toBe(200);

    expect(result.body.id).toBeUndefined();
  });

  it('/products/:asdf (GET) should return 400', async () => {
    const result = await request
      .default(app.getHttpServer())
      .get('/products/asdf');

    expect(result.status).toBe(400);

    expect(result.body.message).toBeInstanceOf(Array);
    expect(typeof result.body.message[0]).toBe('string');
  });
});
