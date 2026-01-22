import { Injectable } from '@nestjs/common';
import { AuthorRequest } from '../request/author.request';
import { AuthorRepository } from '../repository/author.repository';
import { ImageService } from 'src/file/service/image.service';
import { Transactional } from 'src/global/decorators/transactional.decorator';
import { ImageResponse } from 'src/file/response/image.response';
import { AuthorResponse } from '../response/author.response';
import { ApiException } from 'src/global/exception/api.exception';
import { ErrorCode } from 'src/global/enum/error-code.enum';

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly imageService: ImageService,
  ) {}

  @Transactional()
  async createAuthor(request: AuthorRequest): Promise<AuthorResponse> {
    const newAuthorEntity = await this.authorRepository.save(
      AuthorRequest.toModel(request),
    );
    const authorId = newAuthorEntity.id;
    if (request.image) {
      const savedImages: ImageResponse[] = await this.imageService.createImages(
        {
          id: authorId,
          images: [request.image],
          existingImages: [],
          entity: 'author',
        },
      );
      const image = savedImages[0];
      await this.authorRepository.updateAuthorImage(authorId, image.id);
    }
    const newAuthor = await this.authorRepository.findById(authorId);
    const response = AuthorResponse.fromModel(newAuthor);
    return response;
  }

  async findAll(): Promise<AuthorResponse[]> {
    const authors = await this.authorRepository.findAll();
    const response = authors.map((author) => AuthorResponse.fromModel(author));
    return response;
  }

  async findById(id: string): Promise<AuthorResponse> {
    const author = await this.authorRepository.findById(id);
    if (!author) {
      throw new ApiException(ErrorCode.AUTHOR_NOT_FOUND);
    }
    const response = AuthorResponse.fromModel(author);
    return response;
  }

  async updateAuthor(id: string, request: AuthorRequest) {
    const author = await this.authorRepository.findById(id);
    if (!author) {
      throw new ApiException(ErrorCode.AUTHOR_NOT_FOUND);
    }

    const updateAuthorEntity = await this.authorRepository.update(
      id,
      AuthorRequest.toModel(request),
    );
    const authorId = updateAuthorEntity.id;
    if (request.image) {
      const savedImages: ImageResponse[] = await this.imageService.updateImages(
        {
          id: authorId,
          images: [request.image],
          existingImages: [author.image.url],
          entity: 'author',
        },
      );
      const image = savedImages[0];
      await this.authorRepository.updateAuthorImage(authorId, image.id);
    }
    const newAuthor = await this.authorRepository.findById(authorId);
    const response = AuthorResponse.fromModel(newAuthor);
    return response;
  }
}
