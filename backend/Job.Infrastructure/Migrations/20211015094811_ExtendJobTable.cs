using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace JobProcessing.Infrastructure.Migrations
{
    public partial class ExtendJobTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Address_LocationId",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.AlterColumn<int>(
                name: "LocationId",
                schema: "Job",
                table: "Jobs",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                schema: "Job",
                table: "Jobs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreateDate",
                schema: "Job",
                table: "Jobs",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<int>(
                name: "JobStatus",
                schema: "Job",
                table: "Jobs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                schema: "Job",
                table: "Jobs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Category",
                schema: "Job",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CategoryName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_CategoryId",
                schema: "Job",
                table: "Jobs",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Address_LocationId",
                schema: "Job",
                table: "Jobs",
                column: "LocationId",
                principalSchema: "Job",
                principalTable: "Address",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Category_CategoryId",
                schema: "Job",
                table: "Jobs",
                column: "CategoryId",
                principalSchema: "Job",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Address_LocationId",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Category_CategoryId",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.DropTable(
                name: "Category",
                schema: "Job");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_CategoryId",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "JobStatus",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.AlterColumn<int>(
                name: "LocationId",
                schema: "Job",
                table: "Jobs",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Address_LocationId",
                schema: "Job",
                table: "Jobs",
                column: "LocationId",
                principalSchema: "Job",
                principalTable: "Address",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
